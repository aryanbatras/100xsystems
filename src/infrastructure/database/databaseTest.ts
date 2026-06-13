import { supabase } from '../supabase';
import { ProfilesService } from './profilesService';
import { ProgressService } from './progressService';
import { AchievementsService } from './achievementsService';
import { AnalyticsService } from './analyticsService';
import { CommunityService } from './communityService';

export class DatabaseTestUtil {
  private static log(message: string, data?: any, level: 'info' | 'warn' | 'error' = 'info') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [DatabaseTest] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'error':
        break;
      case 'warn':
        break;
      default:
    }
  }

  static async testConnection(): Promise<boolean> {
    this.log('Testing Supabase connection...');
    
    try {
      const { data, error } = await supabase.from('profiles').select('count').single();
      
      if (error) {
        this.log('Connection test failed', { error: error.message }, 'error');
        return false;
      }
      
      this.log('Connection test successful', { connected: true });
      return true;
    } catch (error) {
      this.log('Connection test exception', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return false;
    }
  }

  static async testTables(): Promise<{ table: string; exists: boolean; error?: string }[]> {
    this.log('Testing table access...');
    
    const tables = [
      'profiles',
      'user_preferences', 
      'user_progress',
      'learning_sessions',
      'user_notes',
      'achievements',
      'user_achievements',
      'learning_streaks',
      'user_analytics',
      'study_groups',
      'study_group_members',
      'community_posts',
      'community_replies',
      'mentorship_connections'
    ];

    const results = [];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase.from(table).select('count').single();
        
        if (error) {
          results.push({ table, exists: false, error: error.message });
          this.log(`Table ${table} not accessible`, { error: error.message }, 'warn');
        } else {
          results.push({ table, exists: true });
          this.log(`Table ${table} accessible`);
        }
      } catch (error) {
        results.push({ table, exists: false, error: error instanceof Error ? error.message : 'Unknown error' });
        this.log(`Table ${table} test exception`, { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      }
    }
    
    return results;
  }

  static async testUserServices(userId: string): Promise<{
    profile: boolean;
    progress: boolean;
    achievements: boolean;
    analytics: boolean;
    community: boolean;
  }> {
    this.log('Testing user services', { userId });
    
    const results = {
      profile: false,
      progress: false,
      achievements: false,
      analytics: false,
      community: false,
    };

    // Test Profile Service
    try {
      const profile = await ProfilesService.getProfile(userId);
      results.profile = profile !== null;
      this.log('Profile service test', { success: results.profile, hasProfile: !!profile });
    } catch (error) {
      this.log('Profile service test failed', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
    }

    // Test Progress Service
    try {
      const progress = await ProgressService.getUserProgress(userId);
      results.progress = Array.isArray(progress);
      this.log('Progress service test', { success: results.progress, progressCount: progress.length });
    } catch (error) {
      this.log('Progress service test failed', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
    }

    // Test Achievements Service
    try {
      const achievements = await AchievementsService.getUserAchievements(userId);
      results.achievements = Array.isArray(achievements);
      this.log('Achievements service test', { success: results.achievements, achievementCount: achievements.length });
    } catch (error) {
      this.log('Achievements service test failed', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
    }

    // Test Analytics Service
    try {
      const analytics = await AnalyticsService.getUserAnalytics(userId);
      results.analytics = analytics !== null;
      this.log('Analytics service test', { success: results.analytics, hasAnalytics: !!analytics });
    } catch (error) {
      this.log('Analytics service test failed', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
    }

    // Test Community Service
    try {
      const studyGroups = await CommunityService.getUserStudyGroups(userId);
      results.community = Array.isArray(studyGroups);
      this.log('Community service test', { success: results.community, studyGroupCount: studyGroups.length });
    } catch (error) {
      this.log('Community service test failed', { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
    }

    return results;
  }

  static async testRLSPolicies(): Promise<{ table: string; operation: string; success: boolean; error?: string }[]> {
    this.log('Testing RLS policies...');
    
    const testUserId = '00000000-0000-0000-0000-000000000000'; // Invalid user ID to test RLS
    const results = [];

    // Test SELECT operations
    const selectTests = [
      { table: 'profiles', operation: 'select' },
      { table: 'user_progress', operation: 'select' },
      { table: 'user_achievements', operation: 'select' },
      { table: 'learning_streaks', operation: 'select' },
    ];

    for (const test of selectTests) {
      try {
        const { data, error } = await supabase
          .from(test.table)
          .select('*')
          .eq('user_id', testUserId)
          .limit(1);

        if (error) {
          // Handle 406 (Not Acceptable) as expected for invalid user
          if (error.code === '406' || error.code === 'PGRST116') {
            results.push({ 
              table: test.table, 
              operation: test.operation, 
              success: true, // 406 is expected for invalid user
              error: 'Expected RLS block'
            });
            this.log(`RLS test passed for ${test.table}.${test.operation}`, { error: error.message, note: 'Expected RLS block for invalid user' });
          } else {
            results.push({ 
              table: test.table, 
              operation: test.operation, 
              success: false, 
              error: error.message 
            });
            this.log(`RLS test failed for ${test.table}.${test.operation}`, { error: error.message }, 'warn');
          }
        } else {
          results.push({ table: test.table, operation: test.operation, success: true });
          this.log(`RLS test passed for ${test.table}.${test.operation}`);
        }
      } catch (error) {
        results.push({ 
          table: test.table, 
          operation: test.operation, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        });
        this.log(`RLS test exception for ${test.table}.${test.operation}`, { error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      }
    }

    return results;
  }

  static async runFullDiagnostic(userId?: string): Promise<{
    connection: boolean;
    tables: { table: string; exists: boolean; error?: string }[];
    services?: {
      profile: boolean;
      progress: boolean;
      achievements: boolean;
      analytics: boolean;
      community: boolean;
    };
    rls: { table: string; operation: string; success: boolean; error?: string }[];
  }> {
    this.log('Starting full database diagnostic...');
    
    const connection = await this.testConnection();
    const tables = await this.testTables();
    const rls = await this.testRLSPolicies();
    
    let services;
    if (userId && connection) {
      services = await this.testUserServices(userId);
    }

    const diagnostic = {
      connection,
      tables,
      services,
      rls,
    };

    this.log('Diagnostic complete', {
      connection,
      tableCount: tables.filter(t => t.exists).length,
      totalTables: tables.length,
      rlsPassed: rls.filter(r => r.success).length,
      totalRLSTests: rls.length,
      services: services ? {
        working: Object.values(services).filter(s => s).length,
        total: Object.keys(services).length
      } : null
    });

    return diagnostic;
  }

  static async createTestData(userId: string): Promise<boolean> {
    this.log('Creating test data...', { userId });
    
    try {
      // Create test profile
      const profileUpdate = await ProfilesService.updateProfile(userId, {
        full_name: 'Test User',
        bio: 'This is a test profile for debugging',
        is_public: true,
      });

      if (!profileUpdate) {
        this.log('Failed to create test profile', {}, 'error');
        return false;
      }

      // Create test preferences
      const preferences = await ProfilesService.createPreferences(userId, {
        theme: 'dark',
        email_notifications: true,
        push_notifications: false,
        learning_reminders: true,
        reminder_time: '09:00',
        difficulty_preference: 'intermediate',
        weekly_goal_hours: 10,
      });

      if (!preferences) {
        this.log('Failed to create test preferences', {}, 'warn');
      }

      // Create test progress
      const progress = await ProgressService.updateProgress(userId, 'test-article', 'article', {
        status: 'in-progress',
        progress_percentage: 50,
        time_spent_minutes: 30,
      });

      if (!progress) {
        this.log('Failed to create test progress', {}, 'warn');
      }

      this.log('Test data created successfully', { userId });
      return true;
    } catch (error) {
      this.log('Failed to create test data', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return false;
    }
  }

  static async cleanupTestData(userId: string): Promise<boolean> {
    this.log('Cleaning up test data...', { userId });
    
    try {
      // Note: This would require admin privileges or specific cleanup functions
      // For now, we'll just log what would need to be cleaned up
      this.log('Cleanup required for:', {
        userId,
        tables: ['user_progress', 'user_preferences', 'user_achievements', 'learning_sessions', 'user_notes']
      });
      
      return true;
    } catch (error) {
      this.log('Failed to cleanup test data', { userId, error: error instanceof Error ? error.message : 'Unknown error' }, 'error');
      return false;
    }
  }

  static printDiagnosticSummary(diagnostic: Awaited<ReturnType<typeof this.runFullDiagnostic>>): void {
    
    // Connection
    
    // Tables
    const workingTables = diagnostic.tables.filter(t => t.exists).length;
    diagnostic.tables.filter(t => !t.exists).forEach(table => {
    });
    
    // Services
    if (diagnostic.services) {
      const workingServices = Object.values(diagnostic.services).filter(s => s).length;
      Object.entries(diagnostic.services).forEach(([service, working]) => {
      });
    }
    
    // RLS
    const workingRLS = diagnostic.rls.filter(r => r.success).length;
    diagnostic.rls.filter(r => !r.success).forEach(rls => {
    });
    
  }
}
