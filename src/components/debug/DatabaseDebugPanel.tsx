import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { DatabaseTestUtil } from '../../utils/databaseTest';
import styles from '../../styles/components/debug/DatabaseDebugPanel.module.css';;

export const DatabaseDebugPanel: React.FC = () => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [diagnostic, setDiagnostic] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [testDataCreated, setTestDataCreated] = useState(false);

  const runDiagnostic = async () => {
    if (!user?.id) return;
    
    setIsRunning(true);
    try {
      const result = await DatabaseTestUtil.runFullDiagnostic(user.id);
      setDiagnostic(result);
      DatabaseTestUtil.printDiagnosticSummary(result);
    } catch (error) {
    } finally {
      setIsRunning(false);
    }
  };

  const createTestData = async () => {
    if (!user?.id) return;
    
    try {
      const success = await DatabaseTestUtil.createTestData(user.id);
      setTestDataCreated(success);
      if (success) {
        // Run diagnostic again to see the test data
        await runDiagnostic();
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    if (isExpanded && user?.id && !diagnostic) {
      runDiagnostic();
    }
  }, [isExpanded, user?.id]);

  if (!user) return null;

  return (
    <div className={styles.debugPanel}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        🐛 Database Debug {isExpanded ? '▼' : '▶'}
      </button>

      {isExpanded && (
        <div className={styles.panelContent}>
          <div className={styles.header}>
            <h3>Database Diagnostics</h3>
            <div className={styles.actions}>
              <button
                className={styles.actionButton}
                onClick={runDiagnostic}
                disabled={isRunning}
              >
                {isRunning ? '🔄 Running...' : '🔍 Run Diagnostic'}
              </button>
              <button
                className={styles.actionButton}
                onClick={createTestData}
                disabled={isRunning}
              >
                📝 Create Test Data
              </button>
            </div>
          </div>

          {diagnostic && (
            <div className={styles.results}>
              <div className={styles.section}>
                <h4>Connection</h4>
                <div className={`status ${diagnostic.connection ? 'success' : 'error'}`}>
                  {diagnostic.connection ? '✅ Connected' : '❌ Failed'}
                </div>
              </div>

              <div className={styles.section}>
                <h4>Tables ({diagnostic.tables.filter((t: any) => t.exists).length}/{diagnostic.tables.length})</h4>
                <div className={styles.tableList}>
                  {diagnostic.tables.map((table: any, index: number) => (
                    <div key={index} className={`status ${table.exists ? 'success' : 'error'}`}>
                      {table.exists ? '✅' : '❌'} {table.table}
                      {table.error && <span className={styles.errorText}>: {table.error}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {diagnostic.services && (
                <div className={styles.section}>
                  <h4>Services ({Object.values(diagnostic.services).filter((s: any) => s).length}/{Object.keys(diagnostic.services).length})</h4>
                  <div className={styles.serviceList}>
                    {Object.entries(diagnostic.services).map(([service, working], index) => (
                      <div key={index} className={`status ${working ? 'success' : 'error'}`}>
                        {working ? '✅' : '❌'} {service}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.section}>
                <h4>RLS Policies ({diagnostic.rls.filter((r: any) => r.success).length}/{diagnostic.rls.length})</h4>
                <div className={styles.rlsList}>
                  {diagnostic.rls.map((rls: any, index: number) => (
                    <div key={index} className={`status ${rls.success ? 'success' : 'error'}`}>
                      {rls.success ? '✅' : '❌'} {rls.table}.{rls.operation}
                      {rls.error && <span className={styles.errorText}>: {rls.error}</span>}
                    </div>
                  ))}
                </div>
              </div>

              {testDataCreated && (
                <div className={styles.section}>
                  <h4>Test Data</h4>
                  <div className="status success">✅ Test data created successfully</div>
                </div>
              )}
            </div>
          )}

          <div className={styles.footer}>
            <p>User ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Provider: {user.app_metadata?.provider || 'Unknown'}</p>
          </div>
        </div>
      )}
    </div>
  );
};
