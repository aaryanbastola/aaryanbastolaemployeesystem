import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Search, Plus, Edit2, Trash2, X, Save, Users, DollarSign, TrendingUp, Download, SortAsc, SortDesc, Filter, BarChart3, Moon, Sun, Eye, Copy, Mail, Phone, MapPin, Calendar, Award, FileText, Clock, Shield, Activity } from 'lucide-react';

const THEMES = {
  light: {
    name: 'Light',
    primary: 'from-blue-50 via-indigo-50 to-purple-50',
    card: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    border: 'border-gray-300',
    hover: 'hover:bg-gray-50'
  },
  dark: {
    name: 'Dark',
    primary: 'bg-gray-900',
    card: 'bg-gray-800',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    border: 'border-gray-600',
    hover: 'hover:bg-gray-700'
  },
  ocean: {
    name: 'Ocean',
    primary: 'from-cyan-50 via-blue-50 to-indigo-50',
    card: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-cyan-700',
    border: 'border-cyan-300',
    hover: 'hover:bg-cyan-50'
  },
  forest: {
    name: 'Forest',
    primary: 'from-green-50 via-emerald-50 to-teal-50',
    card: 'bg-white',
    text: 'text-gray-800',
    textSecondary: 'text-green-700',
    border: 'border-green-300',
    hover: 'hover:bg-green-50'
  }
};

const DEPARTMENTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Customer Support', 'Other'];

// Statistics Card Component
const StatCard = React.memo(({ icon: Icon, value, label, sublabel, gradient }) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-2xl shadow-lg p-6 text-white`} role="article" aria-label={`${label}: ${value}`}>
    <div className="flex items-center justify-between mb-2">
      <Icon className="w-8 h-8 opacity-80" aria-hidden="true" />
      <span className="text-3xl font-bold">{value}</span>
    </div>
    <p className="text-sm opacity-90">{label}</p>
    {sublabel && <p className="text-xs mt-1 opacity-80">{sublabel}</p>}
  </div>
));

// Employee Card Component
const EmployeeCard = React.memo(({ employee, darkMode, onView, onEdit, onDelete, onCopy }) => {
  const { name, employeeId, position, department, address, phone, email, joinDate, salary, bonusPercent } = employee;
  
  const calculateBonus = useCallback((sal, bonus) => (sal * bonus) / 100, []);
  const calculateTotal = useCallback((sal, bonus) => sal + calculateBonus(sal, bonus), [calculateBonus]);
  
  return (
    <article 
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border`}
      aria-label={`Employee: ${name}`}
    >
      <header className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-1`}>{name}</h3>
          {employeeId && (
            <div className="flex items-center gap-2 mb-2">
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`} aria-label="Employee ID">ID: {employeeId}</p>
              <button
                onClick={() => onCopy(employeeId)}
                className={`${darkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}
                aria-label="Copy employee ID"
              >
                <Copy className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          )}
          {position && <p className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{position}</p>}
          {department && (
            <span className={`inline-block mt-2 px-3 py-1 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} text-xs rounded-full font-medium`}>
              {department}
            </span>
          )}
        </div>
        <nav className="flex gap-2" aria-label="Employee actions">
          <button
            onClick={() => onView(employee)}
            className={`${darkMode ? 'text-green-400 hover:bg-green-900/20' : 'text-green-600 hover:bg-green-50'} p-2 rounded-lg transition`}
            aria-label="View details"
            title="View Details"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => onEdit(employee)}
            className={`${darkMode ? 'text-blue-400 hover:bg-blue-900/20' : 'text-blue-600 hover:bg-blue-50'} p-2 rounded-lg transition`}
            aria-label="Edit employee"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            onClick={() => onDelete(employee.id)}
            className={`${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'} p-2 rounded-lg transition`}
            aria-label="Delete employee"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </nav>
      </header>
      
      <div className="space-y-2 text-sm">
        <div className={`flex items-start gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{address}</span>
        </div>
        <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          <span>{phone}</span>
        </div>
        {email && (
          <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{email}</span>
          </div>
        )}
        {joinDate && (
          <div className={`flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Calendar className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>Joined: {new Date(joinDate).toLocaleDateString()}</span>
          </div>
        )}
        
        <div className={`pt-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-3 space-y-1`}>
          <div className="flex justify-between items-center">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Base Salary:</span>
            <span className={`${darkMode ? 'text-gray-200' : 'text-gray-800'} font-bold`}>${salary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-semibold`}>Bonus ({bonusPercent}%):</span>
            <span className="text-green-600 font-bold">+${calculateBonus(salary, bonusPercent).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
            <span className={`${darkMode ? 'text-gray-200' : 'text-gray-700'} font-bold`}>Total:</span>
            <span className={`text-lg font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
              ${calculateTotal(salary, bonusPercent).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
});

const EmployeeManagementSystem = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterBy, setFilterBy] = useState('all');
  const [showStats, setShowStats] = useState(true);
  const [theme, setTheme] = useState('light');
  const [auditLog, setAuditLog] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    department: '',
    position: '',
    salary: '',
    bonusPercent: '',
    joinDate: new Date().toISOString().split('T')[0],
    employeeId: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const darkMode = theme === 'dark';
  const currentTheme = THEMES[theme];

  useEffect(() => {
    loadEmployees();
    loadTheme();
    loadAuditLog();
  }, []);

  const loadTheme = async () => {
    try {
      const result = await window.storage.get('theme');
      if (result?.value) {
        setTheme(result.value);
      }
    } catch (error) {
      console.log('No theme preference found');
    }
  };

  const loadEmployees = async () => {
    try {
      const result = await window.storage.get('employees');
      if (result?.value) {
        setEmployees(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No existing employees found');
    }
  };

  const loadAuditLog = async () => {
    try {
      const result = await window.storage.get('auditLog');
      if (result?.value) {
        setAuditLog(JSON.parse(result.value));
      }
    } catch (error) {
      console.log('No audit log found');
    }
  };

  const addAuditEntry = useCallback(async (action, employeeName, details = '') => {
    const entry = {
      id: Date.now(),
      action,
      employeeName,
      details,
      timestamp: new Date().toISOString(),
      user: 'Admin'
    };
    
    const updatedLog = [entry, ...auditLog].slice(0, 100);
    setAuditLog(updatedLog);
    
    try {
      await window.storage.set('auditLog', JSON.stringify(updatedLog));
    } catch (error) {
      console.error('Error saving audit log:', error);
    }
  }, [auditLog]);

  const saveEmployees = useCallback(async (updatedEmployees) => {
    try {
      await window.storage.set('employees', JSON.stringify(updatedEmployees));
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error('Error saving employees:', error);
      alert('Failed to save data. Please try again.');
    }
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};
    const { name, address, phone, email, salary, bonusPercent } = formData;
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!/^\d{10}$/.test(phone)) newErrors.phone = 'Phone must be exactly 10 digits';
    
    const sal = parseFloat(salary);
    if (isNaN(sal) || sal <= 0) newErrors.salary = 'Salary must be greater than 0';
    
    const bonus = parseFloat(bonusPercent);
    if (isNaN(bonus) || bonus < 0) newErrors.bonusPercent = 'Bonus must be 0 or greater';

    if (!editingEmployee && employees.some(emp => emp.name.toLowerCase() === name.trim().toLowerCase())) {
      newErrors.name = 'Employee with this name already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, editingEmployee, employees]);

  const generateEmployeeId = useCallback(() => {
    return 'EMP' + Date.now().toString().slice(-6);
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const { name, address, phone, email, department, position, salary, bonusPercent, joinDate, employeeId, notes } = formData;
    
    const employeeData = {
      id: editingEmployee?.id || Date.now(),
      name: name.trim(),
      address: address.trim(),
      phone,
      email: email.trim(),
      department: department || 'Other',
      position: position.trim(),
      salary: parseFloat(salary),
      bonusPercent: parseFloat(bonusPercent),
      joinDate,
      employeeId: employeeId || generateEmployeeId(),
      notes: notes.trim(),
      lastModified: new Date().toISOString()
    };

    let updatedEmployees;
    if (editingEmployee) {
      updatedEmployees = employees.map(emp => 
        emp.id === editingEmployee.id ? employeeData : emp
      );
      addAuditEntry('UPDATE', employeeData.name, `Updated employee information`);
    } else {
      updatedEmployees = [...employees, employeeData];
      addAuditEntry('CREATE', employeeData.name, `Added new employee`);
    }

    saveEmployees(updatedEmployees);
    resetForm();
    setShowModal(false);
  }, [formData, editingEmployee, employees, validateForm, generateEmployeeId, saveEmployees, addAuditEntry]);

  const handleEdit = useCallback((employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      address: employee.address,
      phone: employee.phone,
      email: employee.email || '',
      department: employee.department || '',
      position: employee.position || '',
      salary: employee.salary.toString(),
      bonusPercent: employee.bonusPercent.toString(),
      joinDate: employee.joinDate || new Date().toISOString().split('T')[0],
      employeeId: employee.employeeId || '',
      notes: employee.notes || ''
    });
    setShowModal(true);
  }, []);

  const handleDelete = useCallback((id) => {
    const employee = employees.find(emp => emp.id === id);
    if (window.confirm(`Are you sure you want to delete ${employee?.name}?`)) {
      const updatedEmployees = employees.filter(emp => emp.id !== id);
      saveEmployees(updatedEmployees);
      addAuditEntry('DELETE', employee?.name || 'Unknown', `Deleted employee`);
    }
  }, [employees, saveEmployees, addAuditEntry]);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      department: '',
      position: '',
      salary: '',
      bonusPercent: '',
      joinDate: new Date().toISOString().split('T')[0],
      employeeId: '',
      notes: ''
    });
    setErrors({});
    setEditingEmployee(null);
  }, []);

  const toggleTheme = useCallback(async (newTheme) => {
    setTheme(newTheme);
    try {
      await window.storage.set('theme', newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, []);

  const exportToCSV = useCallback(() => {
    if (employees.length === 0) {
      alert('No employees to export');
      return;
    }

    const headers = ['Employee ID', 'Name', 'Address', 'Phone', 'Email', 'Department', 'Position', 'Salary', 'Bonus %', 'Bonus Amount', 'Total Compensation', 'Join Date', 'Notes'];
    const rows = employees.map(emp => [
      emp.employeeId || '',
      emp.name,
      emp.address,
      emp.phone,
      emp.email || '',
      emp.department || '',
      emp.position || '',
      emp.salary,
      emp.bonusPercent,
      (emp.salary * emp.bonusPercent / 100),
      (emp.salary + emp.salary * emp.bonusPercent / 100),
      emp.joinDate || '',
      (emp.notes || '').replace(/,/g, ';')
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    addAuditEntry('EXPORT', 'System', `Exported ${employees.length} employees to CSV`);
  }, [employees, addAuditEntry]);

  const copyToClipboard = useCallback((text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  }, []);

  const clearAllData = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete ALL employees? This action cannot be undone!')) {
      try {
        await window.storage.set('employees', JSON.stringify([]));
        setEmployees([]);
        addAuditEntry('DELETE_ALL', 'System', `Cleared all employee data`);
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }
  }, [addAuditEntry]);

  const stats = useMemo(() => {
    if (employees.length === 0) return null;

    const totalEmployees = employees.length;
    const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    const totalBonus = employees.reduce((sum, emp) => sum + (emp.salary * emp.bonusPercent / 100), 0);
    const totalCompensation = totalSalary + totalBonus;
    const avgSalary = totalSalary / totalEmployees;
    const avgBonus = totalBonus / totalEmployees;

    const deptCount = {};
    employees.forEach(emp => {
      const dept = emp.department || 'Other';
      deptCount[dept] = (deptCount[dept] || 0) + 1;
    });

    return {
      totalEmployees,
      totalSalary,
      totalBonus,
      totalCompensation,
      avgSalary,
      avgBonus,
      deptCount
    };
  }, [employees]);

  const filteredAndSortedEmployees = useMemo(() => {
    let filtered = employees.filter(emp =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.position && emp.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.department && emp.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (emp.employeeId && emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (filterBy !== 'all') {
      filtered = filtered.filter(emp => emp.department === filterBy);
    }

    return filtered.sort((a, b) => {
      let aVal, bVal;
      
      switch(sortBy) {
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'salary':
          aVal = a.salary;
          bVal = b.salary;
          break;
        case 'total':
          aVal = a.salary + (a.salary * a.bonusPercent / 100);
          bVal = b.salary + (b.salary * b.bonusPercent / 100);
          break;
        case 'department':
          aVal = (a.department || '').toLowerCase();
          bVal = (b.department || '').toLowerCase();
          break;
        case 'joinDate':
          aVal = new Date(a.joinDate || 0);
          bVal = new Date(b.joinDate || 0);
          break;
        default:
          return 0;
      }

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [employees, searchTerm, filterBy, sortBy, sortOrder]);

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-gradient-to-br ${currentTheme.primary} p-6`}>
      <div className="max-w-7xl mx-auto">
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-2xl shadow-xl p-6 mb-6 border transition-colors duration-300`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`${darkMode ? 'bg-indigo-900' : 'bg-indigo-100'} p-3 rounded-xl transition-colors duration-300`}>
                <Users className={`w-8 h-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Employee Management</h1>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Manage your workforce efficiently</p>
              </div>
            </div>
            <nav className="flex gap-3 flex-wrap" aria-label="Main actions">
              <div className="relative">
                <select
                  value={theme}
                  onChange={(e) => toggleTheme(e.target.value)}
                  className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-4 py-2 rounded-lg transition appearance-none pr-8`}
                  aria-label="Select theme"
                >
                  {Object.entries(THEMES).map(([key, value]) => (
                    <option key={key} value={key}>{value.name}</option>
                  ))}
                </select>
                {theme === 'dark' ? <Moon className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" /> : <Sun className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />}
              </div>
              <button
                onClick={() => setShowStats(!showStats)}
                className={`flex items-center gap-2 ${darkMode ? 'bg-purple-900 text-purple-300 hover:bg-purple-800' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} px-4 py-2 rounded-lg transition`}
                aria-label={showStats ? 'Hide statistics' : 'Show statistics'}
              >
                <BarChart3 className="w-5 h-5" aria-hidden="true" />
                {showStats ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => setShowAuditLog(true)}
                className={`flex items-center gap-2 ${darkMode ? 'bg-yellow-900 text-yellow-300 hover:bg-yellow-800' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'} px-4 py-2 rounded-lg transition`}
                aria-label="View audit log"
              >
                <Activity className="w-5 h-5" aria-hidden="true" />
                Audit
              </button>
              <button
                onClick={exportToCSV}
                className={`flex items-center gap-2 ${darkMode ? 'bg-green-900 text-green-300 hover:bg-green-800' : 'bg-green-100 text-green-700 hover:bg-green-200'} px-4 py-2 rounded-lg transition`}
                aria-label="Export to CSV"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                Export
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition shadow-lg"
                aria-label="Add new employee"
              >
                <Plus className="w-5 h-5" aria-hidden="true" />
                Add
              </button>
            </nav>
          </div>
        </header>

        {showStats && stats && (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" aria-label="Statistics">
            <StatCard icon={Users} value={stats.totalEmployees} label="Total Employees" sublabel={`${Object.keys(stats.deptCount).length} Departments`} gradient="from-blue-500 to-blue-600" />
            <StatCard icon={DollarSign} value={`$${(stats.totalSalary / 1000).toFixed(0)}K`} label="Total Salaries" sublabel={`Avg: $${stats.avgSalary.toLocaleString(undefined, {maximumFractionDigits: 0})}`} gradient="from-green-500 to-green-600" />
            <StatCard icon={TrendingUp} value={`$${(stats.totalBonus / 1000).toFixed(0)}K`} label="Total Bonuses" sublabel={`Avg: $${stats.avgBonus.toLocaleString(undefined, {maximumFractionDigits: 0})}`} gradient="from-purple-500 to-purple-600" />
            <StatCard icon={Award} value={`$${(stats.totalCompensation / 1000).toFixed(0)}K`} label="Total Compensation" gradient="from-orange-500 to-orange-600" />
          </section>
        )}

        <section className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-4 mb-6 transition-colors duration-300`} aria-label="Search and filter">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <label htmlFor="search-input" className="sr-only">Search employees</label>
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'} w-5 h-5`} aria-hidden="true" />
              <input
                id="search-input"
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300`}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <div className="relative">
                <label htmlFor="department-filter" className="sr-only">Filter by department</label>
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-500' : 'text-gray-400'} w-5 h-5`} aria-hidden="true" />
                <select
                  id="department-filter"
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className={`pl-10 pr-8 py-3 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none transition-colors duration-300`}
                >
                  <option value="all">All Departments</option>
                  {DEPARTMENTS.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setSortBy(sortBy === 'name' ? sortBy : 'name') || setSortOrder(sortBy === 'name' ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc')}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
                  sortBy === 'name' 
                    ? `${darkMode ? 'bg-indigo-900 border-indigo-700 text-indigo-300' : 'bg-indigo-50 border-indigo-300 text-indigo-700'}` 
                    : `${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
                }`}
                aria-label={`Sort by name ${sortBy === 'name' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : ''}`}
              >
                Name {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" aria-hidden="true" /> : <SortDesc className="w-4 h-4" aria-hidden="true" />)}
              </button>

              <button
                onClick={() => {
                  if (sortBy === 'salary') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('salary');
                    setSortOrder('asc');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
                  sortBy === 'salary' 
                    ? `${darkMode ? 'bg-indigo-900 border-indigo-700 text-indigo-300' : 'bg-indigo-50 border-indigo-300 text-indigo-700'}` 
                    : `${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
                }`}
                aria-label={`Sort by salary ${sortBy === 'salary' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : ''}`}
              >
                Salary {sortBy === 'salary' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" aria-hidden="true" /> : <SortDesc className="w-4 h-4" aria-hidden="true" />)}
              </button>

              <button
                onClick={() => {
                  if (sortBy === 'joinDate') {
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  } else {
                    setSortBy('joinDate');
                    setSortOrder('asc');
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition ${
                  sortBy === 'joinDate' 
                    ? `${darkMode ? 'bg-indigo-900 border-indigo-700 text-indigo-300' : 'bg-indigo-50 border-indigo-300 text-indigo-700'}` 
                    : `${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`
                }`}
                aria-label={`Sort by date ${sortBy === 'joinDate' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : ''}`}
              >
                Date {sortBy === 'joinDate' && (sortOrder === 'asc' ? <SortAsc className="w-4 h-4" aria-hidden="true" /> : <SortDesc className="w-4 h-4" aria-hidden="true" />)}
              </button>
            </div>
          </div>

          {employees.length > 0 && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {filteredAndSortedEmployees.length} of {employees.length} employees
              </p>
              <button
                onClick={clearAllData}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition ${darkMode ? 'text-red-400 hover:bg-red-900/20' : 'text-red-600 hover:bg-red-50'}`}
                aria-label="Clear all employee data"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                Clear All
              </button>
            </div>
          )}
        </section>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="main" aria-label="Employee list">
          {filteredAndSortedEmployees.length === 0 ? (
            <div className={`col-span-full text-center py-12 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg transition-colors duration-300`}>
              <Users className={`w-16 h-16 ${darkMode ? 'text-gray-600' : 'text-gray-300'} mx-auto mb-4`} aria-hidden="true" />
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>
                {searchTerm || filterBy !== 'all' ? 'No employees found' : 'No employees yet. Add your first employee!'}
              </p>
            </div>
          ) : (
            filteredAndSortedEmployees.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                darkMode={darkMode}
                onView={(e) => {
                  setSelectedEmployee(e);
                  setShowDetailsModal(true);
                }}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCopy={copyToClipboard}
              />
            ))
          )}
        </main>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-labelledby="modal-title" aria-modal="true">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-6">
                <h2 id="modal-title" className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-lg transition`}
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-name" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Name *</label>
                    <input
                      id="emp-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${errors.name ? 'border-red-500' : ''}`}
                      aria-invalid={errors.name ? 'true' : 'false'}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                    />
                    {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="emp-phone" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Phone (10 digits) *</label>
                    <input
                      id="emp-phone"
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${errors.phone ? 'border-red-500' : ''}`}
                      maxLength="10"
                      aria-invalid={errors.phone ? 'true' : 'false'}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                    />
                    {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="emp-email" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Email</label>
                  <input
                    id="emp-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${errors.email ? 'border-red-500' : ''}`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="emp-address" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Address *</label>
                  <input
                    id="emp-address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${errors.address ? 'border-red-500' : ''}`}
                    aria-invalid={errors.address ? 'true' : 'false'}
                    aria-describedby={errors.address ? 'address-error' : undefined}
                  />
                  {errors.address && <p id="address-error" className="text-red-500 text-xs mt-1" role="alert">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-dept" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Department</label>
                    <select
                      id="emp-dept"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    >
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="emp-position" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Position</label>
                    <input
                      id="emp-position"
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({...formData, position: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-salary" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Salary ($) *</label>
                    <input
                      id="emp-salary"
                      type="number"
                      step="0.01"
                      value={formData.salary}
                      onChange={(e) => setFormData({...formData, salary: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${errors.salary ? 'border-red-500' : ''}`}
                      aria-invalid={errors.salary ? 'true' : 'false'}
                      aria-describedby={errors.salary ? 'salary-error' : undefined}
                    />
                    {errors.salary && <p id="salary-error" className="text-red-500 text-xs mt-1" role="alert">{errors.salary}</p>}
                  </div>

                  <div>
                    <label htmlFor="emp-bonus" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Bonus (%) *</label>
                    <input
                      id="emp-bonus"
                      type="number"
                      step="0.01"
                      value={formData.bonusPercent}
                      onChange={(e) => setFormData({...formData, bonusPercent: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} ${errors.bonusPercent ? 'border-red-500' : ''}`}
                      aria-invalid={errors.bonusPercent ? 'true' : 'false'}
                      aria-describedby={errors.bonusPercent ? 'bonus-error' : undefined}
                    />
                    {errors.bonusPercent && <p id="bonus-error" className="text-red-500 text-xs mt-1" role="alert">{errors.bonusPercent}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="emp-joindate" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Join Date</label>
                    <input
                      id="emp-joindate"
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => setFormData({...formData, joinDate: e.target.value})}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    />
                  </div>

                  <div>
                    <label htmlFor="emp-id" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Employee ID</label>
                    <input
                      id="emp-id"
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                      placeholder="Auto-generated if empty"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300'}`}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="emp-notes" className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>Notes</label>
                  <textarea
                    id="emp-notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="3"
                    placeholder="Additional notes..."
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300 ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-white border-gray-300'}`}
                  />
                </div>

                {formData.salary && formData.bonusPercent && (
                  <div className={`${darkMode ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'} border rounded-lg p-4`} role="region" aria-label="Compensation preview">
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 font-semibold`}>Compensation Preview:</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Base Salary:</span>
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${parseFloat(formData.salary).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Bonus ({formData.bonusPercent}%):</span>
                        <span className="font-semibold text-green-600">+${((parseFloat(formData.salary) * parseFloat(formData.bonusPercent)) / 100).toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between text-sm pt-2 border-t ${darkMode ? 'border-indigo-700' : 'border-indigo-300'}`}>
                        <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Total:</span>
                        <span className={`font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>${(parseFloat(formData.salary) + (parseFloat(formData.salary) * parseFloat(formData.bonusPercent)) / 100).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg"
                  >
                    <Save className="w-5 h-5" aria-hidden="true" />
                    {editingEmployee ? 'Update' : 'Add'} Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} py-3 rounded-lg transition font-semibold`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showDetailsModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-labelledby="details-title" aria-modal="true">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-6">
                <h2 id="details-title" className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Employee Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-lg transition`}
                  aria-label="Close details"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-4">
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{selectedEmployee.name}</h3>
                  {selectedEmployee.employeeId && (
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Employee ID: {selectedEmployee.employeeId}</p>
                  )}
                  {selectedEmployee.position && (
                    <p className={`text-sm font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{selectedEmployee.position}</p>
                  )}
                  {selectedEmployee.department && (
                    <span className={`inline-block mt-2 px-3 py-1 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} text-xs rounded-full font-medium`}>
                      {selectedEmployee.department}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                      <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Phone</p>
                    </div>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{selectedEmployee.phone}</p>
                  </div>

                  {selectedEmployee.email && (
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                        <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</p>
                      </div>
                      <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} break-all`}>{selectedEmployee.email}</p>
                    </div>
                  )}

                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg md:col-span-2`}>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                      <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</p>
                    </div>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{selectedEmployee.address}</p>
                  </div>

                  {selectedEmployee.joinDate && (
                    <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} aria-hidden="true" />
                        <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Join Date</p>
                      </div>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{new Date(selectedEmployee.joinDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                <div className={`${darkMode ? 'bg-gradient-to-r from-indigo-900 to-purple-900' : 'bg-gradient-to-r from-indigo-500 to-purple-600'} p-6 rounded-lg text-white`}>
                  <h4 className="font-bold mb-4 text-lg">Compensation Details</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Base Salary:</span>
                      <span className="text-2xl font-bold">${selectedEmployee.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Bonus ({selectedEmployee.bonusPercent}%):</span>
                      <span className="text-2xl font-bold">+${((selectedEmployee.salary * selectedEmployee.bonusPercent) / 100).toLocaleString()}</span>
                    </div>
                    <div className="border-t border-white/30 pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Compensation:</span>
                        <span className="text-3xl font-bold">${(selectedEmployee.salary + (selectedEmployee.salary * selectedEmployee.bonusPercent) / 100).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedEmployee.notes && (
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4 rounded-lg`}>
                    <p className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Notes:</p>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} whitespace-pre-wrap`}>{selectedEmployee.notes}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleEdit(selectedEmployee);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    <Edit2 className="w-5 h-5" aria-hidden="true" />
                    Edit Employee
                  </button>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className={`flex-1 ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} py-3 rounded-lg transition font-semibold`}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAuditLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-labelledby="audit-title" aria-modal="true">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] overflow-y-auto transition-colors duration-300`}>
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Activity className={`w-6 h-6 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} aria-hidden="true" />
                  <h2 id="audit-title" className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Audit Log</h2>
                </div>
                <button
                  onClick={() => setShowAuditLog(false)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-lg transition`}
                  aria-label="Close audit log"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-3">
                {auditLog.length === 0 ? (
                  <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" aria-hidden="true" />
                    <p>No audit log entries yet</p>
                  </div>
                ) : (
                  auditLog.map((entry) => (
                    <div key={entry.id} className={`${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} p-4 rounded-lg border`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                              entry.action === 'CREATE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              entry.action === 'UPDATE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              entry.action === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                            }`}>
                              {entry.action}
                            </span>
                            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{entry.employeeName}</span>
                          </div>
                          {entry.details && (
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{entry.details}</p>
                          )}
                        </div>
                        <div className="text-right ml-4">
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            by {entry.user}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowAuditLog(false)}
                  className={`w-full ${darkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} py-3 rounded-lg transition font-semibold`}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeManagementSystem;
