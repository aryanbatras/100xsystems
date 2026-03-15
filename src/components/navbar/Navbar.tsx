import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { RxCross1 } from "react-icons/rx";
import { CgMenuHotdog } from "react-icons/cg";
import { IoChevronDown } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import { isAdminUser } from "../../utils/auth-helpers";
import { AuthModal } from "../auth/AuthModal";

export function Navbar(): React.ReactElement {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhiteTheme, setIsWhiteTheme] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading, signOut, signInWithGitHub } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if user is admin
  const isAdmin = isAdminUser(user);

  // Routes that should use white theme
  const whiteThemeRoutes = [
    "/articles",
    "/roadmaps",
    "/resources",
    "/groups",
    "/graph",
    "/parser",
    "/admin-dashboard",
    "/dsa",
    "/user-dashboard",
    "/path",
  ];

  useEffect(() => {
    // Check if current route should use white theme
    const currentPath = router.pathname;
    const shouldUseWhiteTheme = whiteThemeRoutes.some(
      (route) => currentPath === route || currentPath.startsWith(route + "/"),
    );
    setIsWhiteTheme(shouldUseWhiteTheme);
  }, [router.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
  };

  // Don't render navbar on article slug pages (static pages)
  if (
    router.pathname.startsWith("/articles/") &&
    router.pathname !== "/articles"
  ) {
    return <div></div>;
  }

  return (
    <>
      <nav className={`${styles.nav} ${isWhiteTheme ? styles.whiteTheme : ""}`}>
        <Link href="/" className={styles.titleLink}>
          <img
            src={
              isWhiteTheme
                ? "/100xsystemsblacklogo.png"
                : "/100xsystemsonlytitle.png"
            }
            alt="100X Systems"
            className={styles.titleImage}
            width={200}
            height={50}
            loading="eager"
          />
        </Link>
        <div className={styles.navContainer} ref={dropdownRef}>
          <div className={styles.navLinks}>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>

            <div 
              className={styles.dropdown}
              onMouseEnter={() => handleDropdownEnter("resources")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => handleDropdownToggle("resources")}
                aria-expanded={activeDropdown === "resources"}
              >
                Resources{" "}
                <IoChevronDown
                  className={`${styles.dropdownIcon} ${activeDropdown === "resources" ? styles.rotated : ""}`}
                />
              </button>
              <div
                className={`${styles.dropdownMenu} ${activeDropdown === "resources" ? styles.show : ""}`}
              >
                <Link href="/resources" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Resources
                </Link>
                <Link href="/dsa" className={styles.dropdownItem} onClick={handleLinkClick}>
                  DSA
                </Link>
                <Link href="/path" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Path
                </Link>
              </div>
            </div>

            <div 
              className={styles.dropdown}
              onMouseEnter={() => handleDropdownEnter("learn")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => handleDropdownToggle("learn")}
                aria-expanded={activeDropdown === "learn"}
              >
                Learn{" "}
                <IoChevronDown
                  className={`${styles.dropdownIcon} ${activeDropdown === "learn" ? styles.rotated : ""}`}
                />
              </button>
              <div
                className={`${styles.dropdownMenu} ${activeDropdown === "learn" ? styles.show : ""}`}
              >
                <Link href="/articles" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Articles
                </Link>
                <Link href="/roadmaps" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Roadmaps
                </Link>
                <Link href="/graph" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Mindmap
                </Link>
                <Link href="/groups" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Groups
                </Link>
              </div>
            </div>

            <div 
              className={styles.dropdown}
              onMouseEnter={() => handleDropdownEnter("about")}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                className={styles.dropdownToggle}
                onClick={() => handleDropdownToggle("about")}
                aria-expanded={activeDropdown === "about"}
              >
                About{" "}
                <IoChevronDown
                  className={`${styles.dropdownIcon} ${activeDropdown === "about" ? styles.rotated : ""}`}
                />
              </button>
              <div
                className={`${styles.dropdownMenu} ${activeDropdown === "about" ? styles.show : ""}`}
              >
                <Link href="/about" className={styles.dropdownItem} onClick={handleLinkClick}>
                  About Us
                </Link>
                <Link href="/contact" className={styles.dropdownItem} onClick={handleLinkClick}>
                  Contact
                </Link>
              </div>
            </div>

            {user ? (
              <div className={styles.userSection}>
                <Link href="/user-dashboard" className={styles.userLink}>
                  Welcome,{" "}
                  {user.user_metadata?.full_name || user.email?.split("@")[0]}
                </Link>
                <button
                  onClick={signOut}
                  className={`${styles.signOutButton} ${isWhiteTheme ? styles.signOutWhite : ""}`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                disabled={loading}
                className={`${styles.authButton} ${isWhiteTheme ? styles.signOutWhite : ""}`}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            )}

            {isAdmin && (
              <div className={styles.adminDropdown}>
                <button
                  className={styles.adminDropdownToggle}
                  onClick={() => handleDropdownToggle("admin")}
                  aria-expanded={activeDropdown === "admin"}
                >
                  Admin{" "}
                  <IoChevronDown
                    className={`${styles.dropdownIcon} ${activeDropdown === "admin" ? styles.rotated : ""}`}
                  />
                </button>
                <div
                  className={`${styles.dropdownMenu} ${activeDropdown === "admin" ? styles.show : ""}`}
                >
                  <Link href="/admin-dashboard" className={styles.dropdownItem} onClick={handleLinkClick}>
                    Dashboard
                  </Link>
                  <Link href="/admin" className={styles.dropdownItem} onClick={handleLinkClick}>
                    Articles
                  </Link>
                  {/* <Link href="/admin/resources" className={styles.dropdownItem} onClick={handleLinkClick}>
                    Resources
                  </Link> */}
                </div>
              </div>
            )}
          </div>
        </div>
        {!isMenuOpen ? (
          <button
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(true)}
          >
            <CgMenuHotdog />
          </button>
        ) : null}
      </nav>
      {isMenuOpen && (
        <div className={styles.mobile_container}>
          <button
            className={styles.crossButton}
            onClick={() => setIsMenuOpen(false)}
          >
            <RxCross1 />
          </button>
          <div className={styles.mobileNav}>
            <div className={styles.mobileNavSection}>
              <h3 className={styles.mobileNavTitle}>Navigation</h3>
              <Link
                href="/"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <h3 className={styles.mobileNavTitle}>Resources (Free)</h3>
              <Link
                href="/resources"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/dsa"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                DSA
              </Link>
              <Link
                href="/path"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Path
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <h3 className={styles.mobileNavTitle}>Learn (Sign-in Required)</h3>
              <Link
                href="/articles"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/roadmaps"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmaps
              </Link>
              <Link
                href="/graph"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Mindmap
              </Link>
              <Link
                href="/groups"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Groups
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <h3 className={styles.mobileNavTitle}>About</h3>
              <Link
                href="/about"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className={styles.mobileLink}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className={styles.mobileNavSection}>
              <h3 className={styles.mobileNavTitle}>Account</h3>
              {user ? (
                <>
                  <Link
                    href="/user-dashboard"
                    className={styles.mobileLink}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Welcome,{" "}
                    {user.user_metadata?.full_name || user.email?.split("@")[0]}
                  </Link>
                  <button
                    onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}
                    className={styles.mobileSignOutButton}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  disabled={loading}
                  className={styles.mobileAuthButton}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              )}
              {isAdmin && (
                <Link
                  href="/admin-dashboard"
                  className={styles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
              {/* {isAdmin && (
                <Link
                  href="/admin/resources"
                  className={styles.mobileLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Resources
                </Link>
              )} */}
            </div>
          </div>
        </div>
      )}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      {/* WhatsApp Group Floating Button */}
      <a
        href="https://chat.whatsapp.com/L5DpJhAjRFi805IDntDXQa?mode=gi_t"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappFloat}
        aria-label="Join our WhatsApp group"
      >
        <FaWhatsapp />
      </a>
    </>
  );
}
