import React, { useState, useEffect, useCallback, useRef } from "react";

// ==============================================
// GLOBAL STYLES - PROFESSIONAL DARK THEME
// ==============================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #0A0C0E;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    /* ===== ANIMATIONS ===== */
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }

    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(255, 153, 0, 0.3); }
      50% { box-shadow: 0 0 20px rgba(255, 153, 0, 0.6); }
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }

    @keyframes highlight {
      0% { background-color: rgba(255, 153, 0, 0.3); }
      100% { background-color: transparent; }
    }

    .dashboard {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    /* ===== SIDEBAR ===== */
    .sidebar {
      width: 280px;
      background: #000000;
      border-right: 1px solid #1A1D21;
      padding: 24px 16px;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.5s ease;
    }

    .user-profile {
      padding: 16px;
      background: linear-gradient(145deg, #0A0C0E, #000000);
      border-radius: 16px;
      margin-bottom: 24px;
      border: 1px solid #1A1D21;
      animation: glow 3s infinite;
    }

    .user-name {
      font-size: 18px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 4px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .online-indicator {
      width: 8px;
      height: 8px;
      background: #10B981;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .user-role {
      font-size: 12px;
      color: #FF9900;
      letter-spacing: 0.5px;
    }

    .sidebar-title {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #6B7280;
      margin: 20px 0 12px 16px;
      letter-spacing: 1px;
    }

    .sidebar-menu {
      list-style: none;
      flex: 1;
    }

    .sidebar-menu-item {
      padding: 12px 16px;
      margin: 4px 0;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 500;
      color: #9CA3AF;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 12px;
      position: relative;
      overflow: hidden;
    }

    .sidebar-menu-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: #FF9900;
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    .sidebar-menu-item:hover::before,
    .sidebar-menu-item.active::before {
      transform: scaleY(1);
    }

    .sidebar-menu-item:hover {
      background: #0A0C0E;
      color: #FFFFFF;
      transform: translateX(5px);
    }

    .sidebar-menu-item.active {
      background: rgba(255, 153, 0, 0.1);
      color: #FF9900;
    }

    /* ===== WEBSOCKET SECTION ===== */
    .webhook-section {
      background: #0A0C0E;
      border: 1px solid #1A1D21;
      border-radius: 16px;
      padding: 20px;
      margin-top: auto;
    }

    .webhook-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
    }

    .webhook-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    .webhook-dot.connected {
      background: #10B981;
      box-shadow: 0 0 10px #10B981;
    }

    .webhook-dot.disconnected {
      background: #EF4444;
    }

    .webhook-title {
      font-size: 12px;
      font-weight: 600;
      color: #FFFFFF;
    }

    .webhook-input {
      width: 100%;
      padding: 12px;
      background: #000000;
      border: 1px solid #1A1D21;
      border-radius: 10px;
      font-size: 11px;
      color: #FFFFFF;
      font-family: monospace;
      margin-bottom: 12px;
      transition: all 0.3s ease;
    }

    .webhook-input:focus {
      border-color: #FF9900;
      box-shadow: 0 0 0 2px rgba(255, 153, 0, 0.2);
      outline: none;
    }

    .webhook-button {
      width: 100%;
      padding: 12px;
      background: linear-gradient(145deg, #FF9900, #FFB340);
      color: #000000;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      position: relative;
      overflow: hidden;
    }

    .webhook-button::after {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(transparent, rgba(255, 255, 255, 0.3), transparent);
      transform: rotate(30deg);
      animation: shimmer 3s infinite;
    }

    .webhook-button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(255, 153, 0, 0.4);
    }

    .webhook-button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* ===== MAIN CONTENT ===== */
    .main-content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: #FF9900 #1A1D21;
    }

    .main-content::-webkit-scrollbar {
      width: 6px;
    }

    .main-content::-webkit-scrollbar-track {
      background: #1A1D21;
    }

    .main-content::-webkit-scrollbar-thumb {
      background: #FF9900;
      border-radius: 3px;
    }

    /* ===== HEADER ===== */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      animation: fadeIn 0.5s ease;
    }

    .header-left {
      display: flex;
      align-items: baseline;
      gap: 12px;
    }

    .page-title {
      font-size: 24px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.5px;
    }

    .page-subtitle {
      font-size: 14px;
      color: #FF9900;
      background: rgba(255, 153, 0, 0.1);
      padding: 4px 12px;
      border-radius: 30px;
      border: 1px solid rgba(255, 153, 0, 0.2);
    }

    .date-badge {
      background: #000000;
      border: 1px solid #1A1D21;
      border-radius: 30px;
      padding: 8px 20px;
      font-size: 13px;
      color: #9CA3AF;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* ===== STATS CARDS ===== */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      background: #000000;
      border: 1px solid #1A1D21;
      border-radius: 20px;
      padding: 24px;
      transition: all 0.3s ease;
      animation: fadeIn 0.5s ease;
      position: relative;
      overflow: hidden;
    }

    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #FF9900, transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    .stat-card:hover::before {
      transform: translateX(0);
    }

    .stat-card:hover {
      transform: translateY(-5px);
      border-color: #FF9900;
      box-shadow: 0 10px 30px rgba(255, 153, 0, 0.1);
    }

    .stat-label {
      font-size: 13px;
      color: #6B7280;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .stat-value {
      font-size: 42px;
      font-weight: 700;
      color: #FFFFFF;
      margin-bottom: 8px;
      line-height: 1;
      transition: all 0.3s ease;
    }

    .stat-card:hover .stat-value {
      color: #FF9900;
    }

    .stat-trend {
      font-size: 13px;
      color: #10B981;
      background: rgba(16, 185, 129, 0.1);
      display: inline-block;
      padding: 4px 12px;
      border-radius: 30px;
      animation: pulse 2s infinite;
    }

    /* ===== FILTER SECTION ===== */
    .filter-section {
      background: #000000;
      border: 1px solid #1A1D21;
      border-radius: 16px;
      padding: 16px 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
      animation: fadeIn 0.5s ease;
    }

    .filter-label {
      font-size: 12px;
      font-weight: 600;
      color: #9CA3AF;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .filter-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 6px 16px;
      background: #0A0C0E;
      border: 1px solid #1A1D21;
      border-radius: 30px;
      font-size: 12px;
      color: #9CA3AF;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .filter-btn::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 153, 0, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.3s, height 0.3s;
    }

    .filter-btn:hover::after {
      width: 100px;
      height: 100px;
    }

    .filter-btn:hover {
      border-color: #FF9900;
      color: #FFFFFF;
      transform: translateY(-2px);
    }

    .filter-btn.active {
      background: #FF9900;
      color: #000000;
      border-color: #FF9900;
      font-weight: 600;
    }

    /* ===== TABLE ===== */
    .table-container {
      background: #000000;
      border: 1px solid #1A1D21;
      border-radius: 20px;
      padding: 20px;
      margin-bottom: 24px;
      overflow-x: auto;
      animation: fadeIn 0.5s ease;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .table-title {
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .live-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255, 153, 0, 0.1);
      padding: 4px 12px;
      border-radius: 30px;
      border: 1px solid rgba(255, 153, 0, 0.2);
    }

    .live-dot {
      width: 8px;
      height: 8px;
      background: #FF9900;
      border-radius: 50%;
      animation: pulse 1.5s infinite;
    }

    .websocket-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: #10B981;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 1000px;
    }

    th {
      text-align: left;
      padding: 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #6B7280;
      border-bottom: 1px solid #1A1D21;
      letter-spacing: 0.5px;
    }

    td {
      padding: 16px;
      font-size: 13px;
      color: #FFFFFF;
      border-bottom: 1px solid #1A1D21;
      transition: all 0.3s ease;
    }

    tr {
      transition: all 0.3s ease;
      animation: slideIn 0.5s ease;
      animation-fill-mode: both;
    }

    tr.updated {
      animation: highlight 1s ease;
    }

    tr:nth-child(1) { animation-delay: 0.1s; }
    tr:nth-child(2) { animation-delay: 0.2s; }
    tr:nth-child(3) { animation-delay: 0.3s; }
    tr:nth-child(4) { animation-delay: 0.4s; }
    tr:nth-child(5) { animation-delay: 0.5s; }

    tr:hover td {
      background: #0A0C0E;
      transform: scale(1.01);
    }

    .type-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 30px;
      font-size: 11px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .type-badge.b2c {
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    .type-badge.b2b {
      background: rgba(255, 153, 0, 0.1);
      color: #FF9900;
      border: 1px solid rgba(255, 153, 0, 0.2);
    }

    .type-badge.other {
      background: rgba(107, 114, 128, 0.1);
      color: #9CA3AF;
      border: 1px solid rgba(107, 114, 128, 0.2);
    }

    /* ===== STATUS GRID ===== */
    .status-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 20px;
    }

    .status-item {
      background: #0A0C0E;
      border: 1px solid #1A1D21;
      border-radius: 16px;
      padding: 20px;
      transition: all 0.3s ease;
      animation: fadeIn 0.5s ease;
    }

    .status-item:hover {
      transform: translateY(-5px);
      border-color: #FF9900;
    }

    .status-name {
      font-size: 14px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .status-count {
      font-size: 28px;
      font-weight: 700;
      color: #FF9900;
      margin-bottom: 8px;
    }

    .progress-bar {
      width: 100%;
      height: 4px;
      background: #1A1D21;
      border-radius: 2px;
      margin: 12px 0;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #FF9900, #FFB340);
      border-radius: 2px;
      transition: width 0.5s ease;
    }

    /* ===== LOADING ===== */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease;
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 3px solid #1A1D21;
      border-top-color: #FF9900;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    /* ===== TOAST ===== */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #000000;
      border: 1px solid #FF9900;
      border-radius: 12px;
      padding: 16px 24px;
      color: #FFFFFF;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideIn 0.3s ease, glow 2s infinite;
      z-index: 1000;
    }
  `}</style>
);
// ==============================================
// MAIN DASHBOARD COMPONENT
// ==============================================
export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookConnected, setWebhookConnected] = useState(false);
  const [runStatus, setRunStatus] = useState("idle");
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [toast, setToast] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [updatedRow, setUpdatedRow] = useState(null);
  const ws = useRef(null);
  const [stats, setStats] = useState({
    totalLeads: "0",
    todayLeads: "+0",
    successRate: "0%",
    avgTime: "4.2s",
    avgPercent: "94.2%",
    completedLeads: "0",
    pendingLeads: "0",
    skippedLeads: "0",
    errorLeads: "0",
    succeededLeads: "0",
    failedLeads: "0",
    suspendedLeads: "0"
  });

  // Menu items
  const menuItems = [
    { icon: "📊", name: "Dashboard" },
    { icon: "🔄", name: "Workflow Builder" },
    { icon: "📥", name: "Google Sheets Sync" },
    { icon: "🤖", name: "AI Rules" },
    { icon: "🤖", name: "AI Rules" },
    { icon: "⚡", name: "Batch Processor" },
    { icon: "❤️", name: "API Health" },
    { icon: "❓", name: "Support" }
  ];

  // Status filters
  const statusFilters = [
    "All", "Error", "Completed", "Skipped", 
    "Succeeded", "Failed", "Suspended"
  ];

  // Show toast message
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Connect to WebSocket for real-time updates
  const connectWebSocket = useCallback(() => {
    if (!webhookUrl) return;

    // Convert HTTP to WebSocket URL
    const wsUrl = webhookUrl.replace('https://', 'wss://').replace('http://', 'ws://');
    
    ws.current = new WebSocket(`${wsUrl}?watch=true`);

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setWebhookConnected(true);
      showToast('🔌 Real-time updates connected');
    };

    ws.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        // Handle different update types
        if (data.type === 'row_update' || data.type === 'new_row') {
          // Update leads with new data
          setLeads(prevLeads => {
            const newLeads = [...prevLeads];
            const index = newLeads.findIndex(l => l.id === data.row.id);
            
            if (index >= 0) {
              newLeads[index] = data.row;
              setUpdatedRow(data.row.id);
            } else {
              newLeads.unshift(data.row);
              setUpdatedRow(data.row.id);
            }
            
            // Highlight updated row
            setTimeout(() => setUpdatedRow(null), 1000);
            
            return newLeads;
          });

          // Update stats
          updateStatsFromData(data.row);
          setLastUpdate(new Date());
          
          showToast(`🔄 ${data.row.company || 'Lead'} updated`, 'info');
        }
        
        if (data.type === 'batch_update') {
          setLeads(data.rows);
          calculateStats(data.rows);
          setLastUpdate(new Date());
          showToast(`📊 ${data.rows.length} leads updated`, 'success');
        }
      } catch (error) {
        console.log('WebSocket message error:', error);
      }
    };

    ws.current.onerror = (error) => {
      console.log('WebSocket error:', error);
      setWebhookConnected(false);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setWebhookConnected(false);
      
      // Try to reconnect after 5 seconds
      setTimeout(connectWebSocket, 5000);
    };
  }, [webhookUrl]);

  // Update stats when new data comes
  const updateStatsFromData = (row) => {
    setStats(prev => {
      const newStats = { ...prev };
      const total = parseInt(prev.totalLeads) + 1;
      newStats.totalLeads = total.toString();
      
      if (row.status === 'Completed') {
        newStats.completedLeads = (parseInt(prev.completedLeads) + 1).toString();
      } else if (row.status === 'Pending') {
        newStats.pendingLeads = (parseInt(prev.pendingLeads) + 1).toString();
      } else if (row.status === 'Skipped') {
        newStats.skippedLeads = (parseInt(prev.skippedLeads) + 1).toString();
      } else if (row.status === 'Error') {
        newStats.errorLeads = (parseInt(prev.errorLeads) + 1).toString();
      }
      
      newStats.successRate = Math.round((parseInt(newStats.completedLeads) / total) * 100) + '%';
      
      return newStats;
    });
  };

  // Calculate stats from leads array
  const calculateStats = (leadsArray) => {
    const total = leadsArray.length;
    const completed = leadsArray.filter(l => l.status === "Completed").length;
    const pending = leadsArray.filter(l => l.status === "Pending").length;
    const skipped = leadsArray.filter(l => l.status === "Skipped").length;
    const error = leadsArray.filter(l => l.status === "Error").length;
    const succeeded = leadsArray.filter(l => l.status === "Succeeded").length;
    const failed = leadsArray.filter(l => l.status === "Failed").length;
    const suspended = leadsArray.filter(l => l.status === "Suspended").length;
    
    setStats({
      totalLeads: total.toString(),
      todayLeads: "+" + Math.floor(Math.random() * 200),
      successRate: total > 0 ? Math.round((completed / total) * 100) + "%" : "0%",
      avgTime: "4.2s",
      avgPercent: "94.2%",
      completedLeads: completed.toString(),
      pendingLeads: pending.toString(),
      skippedLeads: skipped.toString(),
      errorLeads: error.toString(),
      succeededLeads: succeeded.toString(),
      failedLeads: failed.toString(),
      suspendedLeads: suspended.toString()
    });
  };

  // Check webhook connection
  const checkWebhookConnection = useCallback(async () => {
    if (!webhookUrl) {
      setWebhookConnected(false);
      return;
    }
    
    try {
      const response = await fetch(`${webhookUrl}?test=true&t=${Date.now()}`, { 
        method: "GET",
        mode: "cors" 
      });
      
      if (response.ok) {
        setWebhookConnected(true);
        showToast("✅ Webhook connected successfully");
        connectWebSocket(); // Connect WebSocket for real-time updates
      } else {
        setWebhookConnected(false);
        showToast("❌ Webhook connection failed", "error");
      }
    } catch {
      setWebhookConnected(false);
      showToast("❌ Webhook connection failed", "error");
    }
  }, [webhookUrl, connectWebSocket]);

  // Fetch initial data
  const fetchLiveData = useCallback(async () => {
    if (!webhookConnected || !webhookUrl) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${webhookUrl}?action=getAllLeads&t=${Date.now()}`, {
        method: "GET",
        mode: "cors"
      });
      
      if (response.ok) {
        const data = await response.json();
        setLeads(data.leads || []);
        calculateStats(data.leads || []);
        setLastUpdate(new Date());
        showToast("✅ Live data loaded");
      }
    } catch (error) {
      console.log("Fetch error:", error);
    }
    setLoading(false);
  }, [webhookConnected, webhookUrl]);

  // Run workflow
  const handleRunWorkflow = async () => {
    if (!webhookConnected) {
      showToast("❌ Webhook not connected", "error");
      return;
    }
    
    setRunStatus("running");
    showToast("⏳ Running workflow...", "info");
    
    try {
      await fetch(`${webhookUrl}?trigger=run_all_pending&t=${Date.now()}`, {
        method: "GET",
        mode: "cors"
      });
      
      setRunStatus("success");
      showToast("✅ Workflow triggered - watching for updates...", "success");
      
      // Fetch updated data
      setTimeout(() => {
        fetchLiveData();
        setRunStatus("idle");
      }, 3000);
    } catch {
      setRunStatus("error");
      showToast("❌ Workflow failed", "error");
      setTimeout(() => setRunStatus("idle"), 2000);
    }
  };

  // Cleanup WebSocket on unmount
  useEffect(() => {
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Auto-refresh fallback (if WebSocket fails)
  useEffect(() => {
    if (webhookConnected && !ws.current) {
      const interval = setInterval(fetchLiveData, 10000); // 10 seconds fallback
      return () => clearInterval(interval);
    }
  }, [webhookConnected, fetchLiveData]);

  // Filter leads by status
  const filteredLeads = leads.filter(lead => {
    if (filterStatus === "all") return true;
    return lead.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  // Sample leads for display
  const displayLeads = filteredLeads.length > 0 ? filteredLeads : [
    {
      id: 1,
      company: "Timeless Clinic",
      location: "Non-Invasive Cosmetic Treatment",
      type: "B2C Physical",
      category: "Healthcare & Wellness",
      niche: "Skin Care, Hair Care, Beauty Products, Personal Care",
      status: "Completed"
    },
    {
      id: 2,
      company: "Sensory Toys",
      location: "Sensory Toys for Children",
      type: "B2C Physical",
      category: "Toys",
      niche: "Sensory Toys for Children, Educational Toys, Gifts",
      status: "Completed"
    },
    {
      id: 3,
      company: "OpenAI GPT-4o Mini",
      location: "14,208 credits used",
      type: "B2C Physical",
      category: "Health & Wellness",
      niche: "OpenAI GPT-4o Mini, Mental Health Services, Therapy",
      status: "Pending"
    },
    {
      id: 4,
      company: "Serper For Kids",
      location: "14,208 credits used",
      type: "B2C Physical",
      category: "Childcare and Education",
      niche: "Serper For Kids, Educational Toys, Gifts",
      status: "Succeeded"
    },
    {
      id: 5,
      company: "Other",
      location: "Other",
      type: "Other",
      category: "Other",
      niche: "Other",
      status: "Failed"
    }
  ];

  return (
    <div className="dashboard">
      <GlobalStyles />

      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner" />
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="toast">
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-profile">
          <div className="user-name">
            User Name
            <span className="online-indicator" />
          </div>
          <div className="user-role">Lead Manager</div>
        </div>

        <div className="sidebar-title">Dashboard</div>
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`sidebar-menu-item ${activeMenu === item.name ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>

        {/* WebSocket Section */}
        <div className="webhook-section">
          <div className="webhook-header">
            <div className={`webhook-dot ${webhookConnected ? 'connected' : 'disconnected'}`} />
            <span className="webhook-title">
              {webhookConnected ? 'REAL-TIME ACTIVE' : 'WEBSOCKET'}
            </span>
          </div>
          
          <input
            type="text"
            className="webhook-input"
            value={webhookUrl}
            onChange={(e) => setWebhookUrl(e.target.value)}
            placeholder="Enter n8n webhook URL"
          />
          
          <button
            className="webhook-button"
            onClick={checkWebhookConnection}
            style={{ marginBottom: "8px", background: "#0A0C0E", color: "#FFFFFF" }}
          >
            🔌 Connect WebSocket
          </button>

          <button
            className="webhook-button"
            onClick={handleRunWorkflow}
            disabled={runStatus === "running" || !webhookConnected}
          >
            {runStatus === "running" ? (
              <>⏳ Running...</>
            ) : runStatus === "success" ? (
              <>✓ Workflow Running</>
            ) : (
              <>▶ RUN WORKFLOW</>
            )}
          </button>

          <button
            className="webhook-button"
            onClick={fetchLiveData}
            style={{ marginTop: "8px", background: "#1A1D21", color: "#FFFFFF" }}
          >
            🔄 Manual Refresh
          </button>

          {webhookConnected && (
            <div style={{ 
              marginTop: "12px", 
              fontSize: "10px", 
              color: "#10B981",
              textAlign: "center"
            }}>
              ⚡ Real-time updates active
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <h1 className="page-title">Lead Processing Dashboard</h1>
            <span className="page-subtitle">Amazon Lead Qualifier</span>
          </div>
          <div className="date-badge">
            <span>🕒 {lastUpdate.toLocaleTimeString()}</span>
            {webhookConnected && (
              <span className="websocket-indicator">
                <span className="live-dot" />
                LIVE
              </span>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">📊 TOTAL LEADS PROCESSED</div>
            <div className="stat-value">{stats.totalLeads}</div>
            <div className="stat-trend">{stats.todayLeads} today</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">✅ SUCCESS RATE</div>
            <div className="stat-value">{stats.successRate}</div>
            <div className="stat-trend">{stats.completedLeads} completed</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">⚡ AVG. PROCESSING TIME</div>
            <div className="stat-value">{stats.avgTime}</div>
            <div className="stat-trend">{stats.avgPercent} success rate</div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <span className="filter-label">Filter by Status:</span>
          <div className="filter-buttons">
            {statusFilters.map(status => (
              <button
                key={status}
                className={`filter-btn ${filterStatus === status.toLowerCase() ? 'active' : ''}`}
                onClick={() => setFilterStatus(status.toLowerCase())}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Table */}
        <div className="table-container">
          <div className="table-header">
            <div className="table-title">
              <span>📋 Lead Pipeline Overview</span>
            </div>
            <div className="live-indicator">
              <span className="live-dot" />
              <span>REAL-TIME UPDATES</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Location</th>
                <th>Company Type</th>
                <th>Category</th>
                <th>Niche</th>
                <th>Status</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {displayLeads.map((lead, idx) => (
                <tr 
                  key={lead.id || idx} 
                  className={updatedRow === lead.id ? 'updated' : ''}
                >
                  <td style={{ fontWeight: "500" }}>{lead.company}</td>
                  <td style={{ color: "#9CA3AF", fontSize: "12px" }}>{lead.location}</td>
                  <td>
                    <span className={`type-badge ${
                      lead.type?.includes("B2C") ? 'b2c' : 
                      lead.type?.includes("B2B") ? 'b2b' : 'other'
                    }`}>
                      {lead.type || "B2C Physical"}
                    </span>
                  </td>
                  <td style={{ color: "#9CA3AF" }}>{lead.category}</td>
                  <td style={{ color: "#FF9900", fontSize: "12px" }}>{lead.niche}</td>
                  <td>
                    <span className={`type-badge ${
                      lead.status === "Completed" ? 'b2c' :
                      lead.status === "Pending" ? 'b2b' : 'other'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td style={{ color: "#6B7280", fontSize: "11px" }}>
                    {new Date().toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Grid */}
        <div className="status-grid">
          <div className="status-item">
            <div className="status-name">✅ Completed</div>
            <div className="status-count">{stats.completedLeads}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ 
                width: `${(parseInt(stats.completedLeads) / (parseInt(stats.totalLeads) || 1)) * 100}%` 
              }} />
            </div>
          </div>

          <div className="status-item">
            <div className="status-name">⏳ Pending</div>
            <div className="status-count">{stats.pendingLeads}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ 
                width: `${(parseInt(stats.pendingLeads) / (parseInt(stats.totalLeads) || 1)) * 100}%` 
              }} />
            </div>
          </div>

          <div className="status-item">
            <div className="status-name">⏭️ Skipped</div>
            <div className="status-count">{stats.skippedLeads}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ 
                width: `${(parseInt(stats.skippedLeads) / (parseInt(stats.totalLeads) || 1)) * 100}%` 
              }} />
            </div>
          </div>

          <div className="status-item">
            <div className="status-name">❌ Error</div>
            <div className="status-count">{stats.errorLeads}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ 
                width: `${(parseInt(stats.errorLeads) / (parseInt(stats.totalLeads) || 1)) * 100}%` 
              }} />
            </div>
          </div>

          <div className="status-item">
            <div className="status-name">✨ Succeeded</div>
            <div className="status-count">{stats.succeededLeads}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ 
                width: `${(parseInt(stats.succeededLeads) / (parseInt(stats.totalLeads) || 1)) * 100}%` 
              }} />
            </div>
          </div>

          <div className="status-item">
            <div className="status-name">⛔ Suspended</div>
            <div className="status-count">{stats.suspendedLeads}</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ 
                width: `${(parseInt(stats.suspendedLeads) / (parseInt(stats.totalLeads) || 1)) * 100}%` 
              }} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          marginTop: "24px", 
          padding: "16px", 
          background: "#000000", 
          border: "1px solid #1A1D21", 
          borderRadius: "12px",
          fontSize: "12px",
          color: "#6B7280",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>📊 Google Sheet: Sheet5 - Company Analysis</span>
          <span>Last sync: {lastUpdate.toLocaleTimeString()}</span>
          <span>
            WebSocket: {webhookConnected ? (
              <span style={{ color: "#10B981" }}>🟢 Connected (Real-time)</span>
            ) : (
              <span style={{ color: "#EF4444" }}>🔴 Disconnected</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
