import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import learningTracker from '../services/learningTracker';
import './Dashboard.css';

const Dashboard = ({ onBackToLearning, userId = 1 }) => {
  const [stats, setStats] = useState({
    overallProgress: 0,
    practicesCompleted: 0,
    totalPractices: 31,
    testsPassed: 0,
    totalTests: 12
  });

  const [chapterProgress, setChapterProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await learningTracker.getDashboardData(userId);
      
      if (data) {
        setStats(data.stats);
        setChapterProgress(data.chapterProgress || []);
        setError(null);
      } else {
        setError('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Error loading data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];

  const progressData = [
    { name: 'Completed', value: stats.practicesCompleted },
    { name: 'Remaining', value: stats.totalPractices - stats.practicesCompleted }
  ];

  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>Loading Dashboard...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h2>⚠️ {error}</h2>
          <button onClick={fetchDashboardData} className="btn-back">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 <span>Learning Dashboard</span></h1>
      </div>

      {/* 核心指标卡片 */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Overall Progress</h3>
            <div className="stat-value">{stats.overallProgress}%</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-content">
            <h3>Practices</h3>
            <div className="stat-value">{stats.practicesCompleted}/{stats.totalPractices}</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3>Tests Passed</h3>
            <div className="stat-value">{stats.testsPassed}/{stats.totalTests}</div>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="charts-section">
        <div className="chart-card">
          <h3>Practice Completion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={progressData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {progressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Chapter Progress</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chapterProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="chapter" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="percentage" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
