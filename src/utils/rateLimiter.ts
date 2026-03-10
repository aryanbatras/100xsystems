// Rate limiting utility for API endpoints
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimiter {
  private store: RateLimitStore = {};
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    
    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000);
  }

  private cleanup(): void {
    const now = Date.now();
    Object.keys(this.store).forEach(key => {
      if (this.store[key].resetTime <= now) {
        delete this.store[key];
      }
    });
  }

  public isAllowed(identifier: string): { allowed: boolean; resetTime?: number } {
    const now = Date.now();
    const key = identifier;

    // Initialize or get existing record
    if (!this.store[key]) {
      this.store[key] = {
        count: 0,
        resetTime: now + this.windowMs
      };
    }

    const record = this.store[key];

    // Reset if window expired
    if (record.resetTime <= now) {
      record.count = 0;
      record.resetTime = now + this.windowMs;
    }

    // Check if under limit
    if (record.count < this.maxRequests) {
      record.count++;
      return { allowed: true };
    } else {
      return { 
        allowed: false, 
        resetTime: record.resetTime 
      };
    }
  }

  public getRemainingRequests(identifier: string): number {
    const now = Date.now();
    const record = this.store[identifier];

    if (!record || record.resetTime <= now) {
      return this.maxRequests;
    }

    return Math.max(0, this.maxRequests - record.count);
  }

  public getResetTime(identifier: string): number | null {
    const record = this.store[identifier];
    if (!record) {
      return null;
    }

    const now = Date.now();
    return record.resetTime > now ? record.resetTime : null;
  }
}

// Create rate limiters for different endpoints
export const aiChatRateLimiter = new RateLimiter(1, 60000); // 5 requests per minute
export const voiceTranscribeRateLimiter = new RateLimiter(1, 60000); // 3 requests per minute
export const textToSpeechRateLimiter = new RateLimiter(1, 60000); // 10 requests per minute

// Helper function to get client identifier
export function getClientIdentifier(req: any): string {
  // Try to get user ID from auth header first
  const authHeader = req.headers.authorization;
  if (authHeader) {
    // Extract user info from JWT or session if available
    return `user:${authHeader.substring(0, 20)}`; // Truncate for privacy
  }

  // Fallback to IP address
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.connection?.remoteAddress;
  return `ip:${ip || 'unknown'}`;
}

// Helper function to set rate limit headers
export function setRateLimitHeaders(res: any, remaining: number, resetTime: number): void {
  res.setHeader('X-RateLimit-Limit', '5');
  res.setHeader('X-RateLimit-Remaining', remaining.toString());
  res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000).toString());
  res.setHeader('Retry-After', Math.ceil((resetTime - Date.now()) / 1000).toString());
}
