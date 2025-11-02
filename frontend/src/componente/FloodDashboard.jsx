import React, { useState } from 'react';
import { Droplets, AlertTriangle, TrendingUp, Clock, MapPin, Activity } from 'lucide-react';
import '../style/FloodDashboard.css';

const FloodDashboard = () => {
  const [period, setPeriod] = useState('month');
  const [reportFilter, setReportFilter] = useState('all');

  const kpis = {
    totalReports: reportFilter === 'prevention' ? 156 : reportFilter === 'response' ? 89 : 245,
    effectiveness: 78.5,
    avgResponseTime: 4.2,
    ige: 82,
    affectedAreas: 12
  };

  const reportsByType = [
    { type: 'Prevenção', value: 156, color: '#10b981' },
    { type: 'Pós-Alagamento', value: 89, color: '#3b82f6' }
  ];

  const riskRanking = [
    { region: 'Zona Leste', incidents: 34, risk: 95, trend: 'up' },
    { region: 'Zona Sul', incidents: 28, risk: 82, trend: 'up' },
    { region: 'Zona Norte', incidents: 19, risk: 68, trend: 'stable' },
    { region: 'Zona Oeste', incidents: 15, risk: 54, trend: 'down' },
    { region: 'Centro', incidents: 8, risk: 32, trend: 'down' }
  ];

  const heatmapData = [
    { region: 'Zona Leste', intensity: 95 },
    { region: 'Zona Sul', intensity: 82 },
    { region: 'Zona Norte', intensity: 68 },
    { region: 'Zona Oeste', intensity: 54 },
    { region: 'Centro', intensity: 32 }
  ];

  return (
    <div className="dashboard">

      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <Droplets className="logo-icon" />
            <div>
              <h1 className="header-title">Sistema IA - Alagamentos SP</h1>
              <p className="header-subtitle">Prevenção e Resposta Inteligente</p>
            </div>
          </div>
        </div>

        <div className="header-controls">
          <select
            value={reportFilter}
            onChange={(e) => setReportFilter(e.target.value)}
            className="select-input"
          >
            <option value="all">Todos os Relatórios</option>
            <option value="prevention">Prevenção</option>
            <option value="response">Pós-Alagamento</option>
          </select>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="select-input"
          >
            <option value="week">Última Semana</option>
            <option value="month">Último Mês</option>
            <option value="quarter">Último Trimestre</option>
          </select>
        </div>
      </header>

      <div className="critical-alert">
        <AlertTriangle className="alert-icon" />
        <div>
          <p className="alert-title">Zona Crítica Identificada</p>
          <p className="alert-description">Zona Leste: Alta reincidência de alagamentos (34 ocorrências)</p>
        </div>
      </div>

      <div className="kpi-grid">

        <div className="kpi-card">
          <div className="kpi-header">
            <Activity className="kpi-icon blue" />
            <span className="kpi-label">Relatórios</span>
          </div>
          <p className="kpi-value">{kpis.totalReports}</p>
          <p className="kpi-description">Total gerado no período</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <TrendingUp className="kpi-icon green" />
            <span className="kpi-label">Efetividade</span>
          </div>
          <p className="kpi-value green">{kpis.effectiveness}%</p>
          <p className="kpi-description">Ações preventivas eficazes</p>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <Clock className="kpi-icon blue" />
            <span className="kpi-label">Resposta</span>
          </div>
          <p className="kpi-value">{kpis.avgResponseTime}h</p>
          <p className="kpi-description">Tempo médio alerta-resolução</p>
        </div>

        <div className="kpi-card ige">
          <div className="kpi-header">
            <MapPin className="kpi-icon green" />
            <span className="kpi-label green">IGE</span>
          </div>
          <p className="kpi-value green">{kpis.ige}</p>
          <p className="kpi-description">Índice Global de Efetividade</p>
        </div>
      </div>

      <div className="content-grid">

        <div className="reports-section">
          <h3 className="section-title">Distribuição de Relatórios</h3>
          <div className="reports-list">
            {reportsByType.map((item, idx) => (
              <div key={idx} className="report-item">
                <div className="report-header">
                  <span className="report-type">{item.type}</span>
                  <span className="report-value">{item.value}</span>
                </div>
                <div className="progress-bar-container">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(item.value / 245) * 100}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}80`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="heatmap-section">
            <h3 className="section-title">Mapa de Calor - Áreas Críticas</h3>
            <div className="heatmap-grid">
              {heatmapData.map((area, idx) => (
                <div key={idx} className="heatmap-item">
                  <div
                    className="heatmap-cell"
                    style={{
                      backgroundColor: `rgba(${255 - area.intensity * 2}, ${area.intensity * 2}, 100, ${area.intensity / 100})`,
                      boxShadow: `0 0 ${area.intensity / 10}px rgba(${255 - area.intensity * 2}, ${area.intensity * 2}, 100, 0.5)`
                    }}
                  >
                    {area.intensity}
                  </div>
                  <p className="heatmap-label">{area.region}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ranking-section">
          <h3 className="section-title">Ranking de Reincidência</h3>
          <div className="ranking-list">
            {riskRanking.map((item, idx) => (
              <div key={idx} className="ranking-item">
                <div className="ranking-header">
                  <div className="ranking-left">
                    <span className={`ranking-badge ${
                      idx === 0 ? 'first' :
                      idx === 1 ? 'second' :
                      'other'
                    }`}>
                      #{idx + 1}
                    </span>
                    <span className="ranking-region">{item.region}</span>
                  </div>
                  <span className={`ranking-trend ${item.trend}`}>
                    {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
                <div className="ranking-details">
                  <span>{item.incidents} ocorrências</span>
                  <span className="ranking-risk">Risco: {item.risk}</span>
                </div>
                <div className="risk-bar-container">
                  <div
                    className={`risk-bar ${
                      item.risk > 80 ? 'high' :
                      item.risk > 60 ? 'medium' :
                      'low'
                    }`}
                    style={{ width: `${item.risk}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="dashboard-footer">
        <div className="footer-status">
          <div className="status-indicator" />
          <span>Análise IA • Dados CGE-SP</span>
        </div>
        <span>Última atualização: {new Date().toLocaleString('pt-BR')}</span>
      </footer>
    </div>
  );
};

export default FloodDashboard;
