import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, TrendingUp, Users, DollarSign, Eye, Brain, BarChart3, FileText, Zap, Download, RefreshCw, Settings, Bell, Activity, Lock, Database, GitBranch } from 'lucide-react';

const AIFinancialEthicsGuardian = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [biasScore, setBiasScore] = useState(87);
  const [transparencyScore, setTransparencyScore] = useState(82);
  const [fairnessScore, setFairnessScore] = useState(91);
  const [selectedModel, setSelectedModel] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [liveData, setLiveData] = useState([]);
  const [timeRange, setTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Simulated live transaction monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRefresh) {
        setBiasScore(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 5)));
        setTransparencyScore(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 6)));
        setFairnessScore(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 4)));
        
        setLiveData(prev => {
          const newEntry = {
            time: new Date().toLocaleTimeString(),
            transactions: Math.floor(Math.random() * 50) + 100,
            flagged: Math.floor(Math.random() * 5)
          };
          return [newEntry, ...prev].slice(0, 20);
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const aiModels = [
    { 
      id: 'credit-scoring', 
      name: 'Credit Scoring Model v2.3', 
      status: 'healthy', 
      risk: 'low',
      accuracy: 94.2,
      lastAudit: '2 hours ago',
      decisions: 12453
    },
    { 
      id: 'fraud-detection', 
      name: 'Fraud Detection AI v1.8', 
      status: 'warning', 
      risk: 'medium',
      accuracy: 89.7,
      lastAudit: '5 hours ago',
      decisions: 8721
    },
    { 
      id: 'loan-approval', 
      name: 'Loan Approval System v3.1', 
      status: 'healthy', 
      risk: 'low',
      accuracy: 92.1,
      lastAudit: '1 hour ago',
      decisions: 5634
    },
    { 
      id: 'investment-advisor', 
      name: 'Investment Advisory Bot v2.0', 
      status: 'critical', 
      risk: 'high',
      accuracy: 76.3,
      lastAudit: '12 hours ago',
      decisions: 3201
    }
  ];

  const ethicalMetrics = [
    { name: 'Bias Detection', score: Math.round(biasScore), icon: Users, color: 'text-blue-500', trend: '+2.3%' },
    { name: 'Transparency', score: Math.round(transparencyScore), icon: Eye, color: 'text-purple-500', trend: '-1.1%' },
    { name: 'Fairness Index', score: Math.round(fairnessScore), icon: CheckCircle, color: 'text-green-500', trend: '+3.7%' },
    { name: 'Explainability', score: 92, icon: Brain, color: 'text-orange-500', trend: '+0.8%' }
  ];

  const recentAlerts = [
    { id: 1, type: 'warning', msg: 'Potential gender bias detected in loan approval algorithm', time: '2 min ago', severity: 'medium', actionTaken: false },
    { id: 2, type: 'info', msg: 'Model transparency report generated successfully', time: '15 min ago', severity: 'low', actionTaken: true },
    { id: 3, type: 'critical', msg: 'Investment advisor showing unequal outcomes across demographics', time: '1 hour ago', severity: 'high', actionTaken: false },
    { id: 4, type: 'warning', msg: 'Credit scoring model drift detected - retraining recommended', time: '2 hours ago', severity: 'medium', actionTaken: false }
  ];

  const performScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setNotifications(prev => prev + 1);
    }, 2500);
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: ethicalMetrics,
      models: aiModels,
      alerts: recentAlerts
    };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ethics-report-${Date.now()}.json`;
    a.click();
  };

  const ModelDetailModal = ({ model, onClose }) => (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full border border-slate-700 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">{model.name}</h2>
            <p className="text-gray-400 mt-1">Comprehensive Ethics Analysis</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Model Accuracy</div>
              <div className="text-3xl font-bold text-green-400">{model.accuracy}%</div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Decisions Made (24h)</div>
              <div className="text-3xl font-bold text-blue-400">{model.decisions.toLocaleString()}</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Last Audit</div>
              <div className="text-xl font-semibold text-white">{model.lastAudit}</div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="text-gray-400 text-sm mb-1">Risk Level</div>
              <div className={`text-xl font-semibold ${
                model.risk === 'low' ? 'text-green-400' : 
                model.risk === 'medium' ? 'text-yellow-400' : 'text-red-400'
              }`}>{model.risk.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-cyan-400">Demographic Performance Analysis</h3>
          {['Gender', 'Race', 'Age', 'Income Level'].map((demographic, idx) => {
            const score = Math.floor(Math.random() * 20) + 75;
            return (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">{demographic} Equity</span>
                  <span className={score >= 85 ? 'text-green-400' : score >= 70 ? 'text-yellow-400' : 'text-red-400'}>
                    {score}%
                  </span>
                </div>
                <div className="bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      score >= 85 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      score >= 70 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-pink-500'
                    }`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 px-4 py-3 rounded-lg font-semibold transition-all">
            Request Re-audit
          </button>
          <button className="flex-1 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg font-semibold transition-all">
            View Full Report
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Top Navigation Bar */}
      <div className="bg-slate-900/50 backdrop-blur-lg border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AI Ethics Guardian
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Responsible Financial AI</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`p-2 rounded-lg transition-all ${autoRefresh ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-gray-400'}`}
              title="Auto-refresh"
            >
              <RefreshCw className={`w-5 h-5 ${autoRefresh ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
            </button>
            <button className="relative p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>
            <button className="hidden sm:block p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-all">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Action Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={performScan}
            disabled={scanning}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Zap className={`w-5 h-5 ${scanning ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{scanning ? 'Scanning All Models...' : 'Run Full Scan'}</span>
            <span className="sm:hidden">{scanning ? 'Scanning...' : 'Scan'}</span>
          </button>
          
          <button
            onClick={exportReport}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Export</span>
          </button>

          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg font-semibold transition-all cursor-pointer outline-none"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-6 bg-slate-800/50 p-2 rounded-lg backdrop-blur scrollbar-hide">
          {['dashboard', 'models', 'live', 'audit', 'compliance'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-slate-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Ethical Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ethicalMetrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div key={idx} className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700 hover:border-cyan-500 transition-all transform hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <Icon className={`w-8 h-8 ${metric.color}`} />
                      <div className="text-right">
                        <div className="text-3xl font-bold">{metric.score}%</div>
                        <div className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.trend}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-gray-400 font-medium mb-3">{metric.name}</h3>
                    <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          metric.score >= 90
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : metric.score >= 75
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-red-500 to-pink-500'
                        }`}
                        style={{ width: `${metric.score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI Models Status */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-cyan-400" />
                AI Models Monitoring
                <span className="ml-auto text-sm text-gray-400">{aiModels.length} models active</span>
              </h2>
              <div className="space-y-3">
                {aiModels.map((model) => (
                  <div
                    key={model.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all cursor-pointer group"
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex items-center gap-4 mb-3 sm:mb-0">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          model.status === 'healthy'
                            ? 'bg-green-500'
                            : model.status === 'warning'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        } animate-pulse`}
                      />
                      <div>
                        <div className="font-medium group-hover:text-cyan-400 transition-colors">{model.name}</div>
                        <div className="text-sm text-gray-400">Accuracy: {model.accuracy}% • {model.decisions.toLocaleString()} decisions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          model.risk === 'low'
                            ? 'bg-green-500/20 text-green-400'
                            : model.risk === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {model.risk.toUpperCase()} RISK
                      </span>
                      <span className="text-gray-400 capitalize text-sm">{model.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Alerts */}
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                Recent Ethics Alerts
              </h2>
              <div className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 bg-slate-700/50 rounded-lg border-l-4 hover:bg-slate-700 transition-all"
                    style={{
                      borderColor:
                        alert.type === 'critical'
                          ? '#ef4444'
                          : alert.type === 'warning'
                          ? '#f59e0b'
                          : '#3b82f6'
                    }}
                  >
                    <AlertTriangle
                      className={`w-5 h-5 flex-shrink-0 ${
                        alert.type === 'critical'
                          ? 'text-red-500'
                          : alert.type === 'warning'
                          ? 'text-yellow-500'
                          : 'text-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-gray-200">{alert.msg}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <p className="text-gray-500 text-sm">{alert.time}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                          alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        {!alert.actionTaken && (
                          <button className="text-xs px-3 py-1 bg-cyan-500 hover:bg-cyan-600 rounded-full transition-all">
                            Take Action
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Models View */}
        {activeTab === 'models' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Bias Analysis Across Demographics
              </h3>
              <div className="space-y-4">
                {[
                  { name: 'Gender Parity', score: 94, change: '+2%' },
                  { name: 'Racial Equity', score: 78, change: '-3%' },
                  { name: 'Age Neutrality', score: 91, change: '+5%' },
                  { name: 'Geographic Fairness', score: 88, change: '+1%' }
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className={item.score >= 85 ? 'text-green-400' : 'text-yellow-400'}>
                          {item.score}%
                        </span>
                        <span className={`text-sm ${item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                    <div className="bg-slate-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-1000 ${
                          item.score >= 85 ? 'bg-green-500' : 'bg-yellow-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Explainability & Transparency
              </h3>
              <div className="space-y-3">
                {[
                  { feature: 'Decision reasoning available', status: true },
                  { feature: 'Feature importance tracking', status: true },
                  { feature: 'Audit trail enabled', status: true },
                  { feature: 'User appeal process', status: false },
                  { feature: 'Real-time monitoring', status: true },
                  { feature: 'Automated bias correction', status: false }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                    {item.status ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    )}
                    <span className="text-gray-200">{item.feature}</span>
                    {!item.status && (
                      <span className="ml-auto text-xs text-yellow-400">In Development</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Monitoring View */}
        {activeTab === 'live' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                Live Transaction Monitoring
                <span className="ml-auto text-sm text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Live
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Transactions/min</div>
                  <div className="text-3xl font-bold text-cyan-400">
                    {liveData[0]?.transactions || 0}
                  </div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Flagged for Review</div>
                  <div className="text-3xl font-bold text-yellow-400">
                    {liveData[0]?.flagged || 0}
                  </div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-gray-400 text-sm mb-1">Success Rate</div>
                  <div className="text-3xl font-bold text-green-400">
                    {liveData[0] ? ((1 - liveData[0].flagged / liveData[0].transactions) * 100).toFixed(1) : 0}%
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 border-b border-slate-600 sticky top-0 bg-slate-800">
                    <tr>
                      <th className="text-left py-2">Time</th>
                      <th className="text-right py-2">Transactions</th>
                      <th className="text-right py-2">Flagged</th>
                      <th className="text-right py-2">Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {liveData.map((entry, idx) => (
                      <tr key={idx} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-all">
                        <td className="py-2">{entry.time}</td>
                        <td className="text-right text-cyan-400">{entry.transactions}</td>
                        <td className="text-right text-yellow-400">{entry.flagged}</td>
                        <td className="text-right">
                          {((1 - entry.flagged / entry.transactions) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Audit View */}
        {activeTab === 'audit' && (
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-slate-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Compliance Audit Trail
              <button className="ml-auto text-sm px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-all">
                Generate Report
              </button>
            </h2>
            <div className="space-y-3">
              {[
                { date: '2025-10-24 14:32', action: 'Bias assessment completed', status: 'passed', auditor: 'System Auto-scan', score: 94 },
                { date: '2025-10-23 09:15', action: 'Fairness metrics review', status: 'passed', auditor: 'J. Smith', score: 91 },
                { date: '2025-10-22 16:45', action: 'Model transparency audit', status: 'flagged', auditor: 'M. Johnson', score: 78 },
                { date: '2025-10-21 11:20', action: 'Data privacy compliance check', status: 'passed', auditor: 'System Auto-scan', score: 98 },
                { date: '2025-10-20 13:55', action: 'Algorithm explainability test', status: 'passed', auditor: 'K. Williams', score: 89 },
                { date: '2025-10-19 10:30', action: 'Demographic equity analysis', status: 'flagged', auditor: 'System Auto-scan', score: 76 }
              ].map((audit, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all">
                  <div className="flex items-center gap-4 mb-3 sm:mb-0">
                    <div className="text-gray-500 text-sm">{audit.date}</div>
                    <div className="font-medium">{audit.action}</div>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-gray-400 text-sm">{audit.auditor}</span>
                    <span className="text-gray-300 text-sm font-medium">{audit.score}%</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        audit.status === 'passed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {audit.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance View */}
        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-slate-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Lock className="w-6 h-6 text-cyan-400" />
                Regulatory Compliance Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { reg: 'EU AI Act', status: 'Compliant', score: 98, lastCheck: '2 days ago' },
                  { reg: 'Fair Lending Laws (ECOA)', status: 'Compliant', score: 95, lastCheck: '1 day ago' },
                  { reg: 'GDPR Requirements', status: 'Compliant', score: 100, lastCheck: '3 hours ago' },
                  { reg: 'Basel III Standards', status: 'Review Needed', score: 85, lastCheck: '5 days ago' },
                  { reg: 'Dodd-Frank Act', status: 'Compliant', score: 92, lastCheck: '1 day ago' },
                  { reg: 'FCRA Compliance', status: 'Compliant', score: 96, lastCheck: '2 days ago' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-semibold text-lg">{item.reg}</div>
                        <div className="text-gray-400 text-sm">Last check: {item.lastCheck}</div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status === 'Compliant'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-700 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full transition-all duration-1000 ${
                            item.score >= 95 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-gray-300 font-semibold">{item.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Governance
                </h3>
                <div className="space-y-3">
                  {[
                    { item: 'Data Privacy Protection', status: 'Active', score: 100 },
                    { item: 'Consent Management', status: 'Active', score: 98 },
                    { item: 'Data Retention Policies', status: 'Active', score: 95 },
                    { item: 'Right to Explanation', status: 'Partial', score: 87 }
                  ].map((data, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <span className="text-gray-200">{data.item}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">{data.score}%</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          data.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {data.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5" />
                  Model Versioning & Control
                </h3>
                <div className="space-y-3">
                  {[
                    { model: 'Credit Scoring v2.3', deployed: '2 weeks ago', performance: 'Stable' },
                    { model: 'Fraud Detection v1.8', deployed: '1 month ago', performance: 'Degrading' },
                    { model: 'Loan Approval v3.1', deployed: '3 days ago', performance: 'Improving' }
                  ].map((model, idx) => (
                    <div key={idx} className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-200">{model.model}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          model.performance === 'Stable' ? 'bg-green-500/20 text-green-400' :
                          model.performance === 'Improving' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {model.performance}
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">Deployed: {model.deployed}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Model Detail Modal */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
};

export default AIFinancialEthicsGuardian;
