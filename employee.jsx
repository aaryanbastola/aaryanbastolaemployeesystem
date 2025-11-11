</div>
              
              {/* --- START OF MISSING CODE --- */}
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Form Input: Name */}
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                    />
                    {errors.name && <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  
                  {/* Form Input: Employee ID (read-only if editing) */}
                  <div>
                    <label htmlFor="employeeId" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Employee ID
                    </label>
                    <input
                      id="employeeId"
                      type="text"
                      value={formData.employeeId || (editingEmployee ? editingEmployee.employeeId : '(auto-generated)')}
                      readOnly
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-100 border-gray-300 text-gray-500'} rounded-lg`}
                    />
                  </div>
                  
                  {/* Form Input: Position */}
                  <div>
                    <label htmlFor="position" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Position
                    </label>
                    <input
                      id="position"
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  
                  {/* Form Input: Department */}
                  <div>
                    <label htmlFor="department" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Department
                    </label>
                    <select
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    >
                      <option value="">Select a department</option>
                      {DEPARTMENTS.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Form Input: Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-required="true"
                      aria-invalid={!!errors.address}
                      aria-describedby="address-error"
                    />
                    {errors.address && <p id="address-error" className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  
                  {/* Form Input: Phone */}
                  <div>
                    <label htmlFor="phone" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Phone (10 digits)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-required="true"
                      aria-invalid={!!errors.phone}
                      aria-describedby="phone-error"
                    />
                    {errors.phone && <p id="phone-error" className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  
                  {/* Form Input: Email */}
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                    />
                    {errors.email && <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  
                  {/* Form Input: Join Date */}
                  <div>
                    <label htmlFor="joinDate" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Join Date
                    </label>
                    <input
                      id="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                  
                  {/* Form Input: Salary */}
                  <div>
                    <label htmlFor="salary" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Salary
                    </label>
                    <input
                      id="salary"
                      type="number"
                      step="1000"
                      min="0"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-required="true"
                      aria-invalid={!!errors.salary}
                      aria-describedby="salary-error"
                    />
                    {errors.salary && <p id="salary-error" className="text-red-500 text-xs mt-1">{errors.salary}</p>}
                  </div>
                  
                  {/* Form Input: Bonus Percent */}
                  <div>
                    <label htmlFor="bonusPercent" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Bonus (%)
                    </label>
                    <input
                      id="bonusPercent"
                      type="number"
                      step="0.5"
                      min="0"
                      value={formData.bonusPercent}
                      onChange={(e) => setFormData({ ...formData, bonusPercent: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      aria-required="true"
                      aria-invalid={!!errors.bonusPercent}
                      aria-describedby="bonus-error"
                    />
                    {errors.bonusPercent && <p id="bonus-error" className="text-red-500 text-xs mt-1">{errors.bonusPercent}</p>}
                  </div>
                  
                  {/* Form Input: Notes */}
                  <div className="md:col-span-2">
                    <label htmlFor="notes" className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                      Notes
                    </label>
                    <textarea
                      id="notes"
                      rows="3"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className={`w-full px-3 py-2 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className={`px-4 py-2 rounded-lg transition ${darkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    <Save className="w-5 h-5" aria-hidden="true" />
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* --- Employee Details Modal --- */}
        {showDetailsModal && selectedEmployee && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-labelledby="details-modal-title" aria-modal="true">
            <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto`}>
              <div className="flex justify-between items-center mb-4">
                <h2 id="details-modal-title" className="text-2xl font-bold">{selectedEmployee.name}</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-lg transition`}
                  aria-label="Close details modal"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="space-y-3">
                <p className={`text-lg font-medium ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>{selectedEmployee.position}</p>
                <div className="flex items-center gap-3">
                  <span className={`inline-block px-3 py-1 ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'} text-xs rounded-full font-medium`}>
                    {selectedEmployee.department}
                  </span>
                  <span className={`inline-block px-3 py-1 ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} text-xs rounded-full font-medium`}>
                    ID: {selectedEmployee.employeeId}
                  </span>
                </div>
                
                <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} space-y-3`}>
                  <div className="flex items-start gap-3">
                    <Mail className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" />
                    <div className="flex-1">
                      <span className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</span>
                      <a href={`mailto:${selectedEmployee.email}`} className="text-blue-500 hover:underline">{selectedEmployee.email}</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" />
                    <div className="flex-1">
                      <span className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</span>
                      <span>{selectedEmployee.phone}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" />
                    <div className="flex-1">
                      <span className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address</span>
                      <span>{selectedEmployee.address}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Calendar className={`w-5 h-5 mt-1 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} aria-hidden="true" />
                    <div className="flex-1">
                      <span className={`block text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Join Date</span>
                      <span>{new Date(selectedEmployee.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} space-y-2`}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Compensation</h4>
                  <div className="flex justify-between items-center">
                    <span>Base Salary:</span>
                    <span className="font-bold">${selectedEmployee.salary.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Bonus ({selectedEmployee.bonusPercent}%):</span>
                    <span className="font-bold text-green-600">+${(selectedEmployee.salary * selectedEmployee.bonusPercent / 100).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-bold">Total:</span>
                    <span className={`font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      ${(selectedEmployee.salary + (selectedEmployee.salary * selectedEmployee.bonusPercent / 100)).toLocaleString()}
                    </span>
                  </div>
                </div>

                {selectedEmployee.notes && (
                  <div className={`pt-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Notes</h4>
                    <p className={`text-sm p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>{selectedEmployee.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* --- Audit Log Modal --- */}
        {showAuditLog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" role="dialog" aria-labelledby="audit-modal-title" aria-modal="true">
            <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-2xl shadow-2xl max-w-3xl w-full p-6 max-h-[90vh] flex flex-col`}>
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Activity className={`w-6 h-6 ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`} aria-hidden="true" />
                  <h2 id="audit-modal-title" className="text-2xl font-bold">Audit Log</h2>
                </div>
                <button
                  onClick={() => setShowAuditLog(false)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'} p-2 rounded-lg transition`}
                  aria-label="Close audit log"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              
              <div className="overflow-y-auto space-y-3">
                {auditLog.length === 0 ? (
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No audit entries yet.</p>
                ) : (
                  auditLog.map(entry => (
                    <div key={entry.id} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {entry.action === 'CREATE' && <Plus className="w-4 h-4 inline-block mr-2 text-green-500" />}
                          {entry.action === 'UPDATE' && <Edit2 className="w-4 h-4 inline-block mr-2 text-blue-500" />}
                          {entry.action === 'DELETE' && <Trash2 className="w-4 h-4 inline-block mr-2 text-red-500" />}
                          {entry.action === 'EXPORT' && <Download className="w-4 h-4 inline-block mr-2 text-purple-500" />}
                          {entry.action === 'DELETE_ALL' && <Shield className="w-4 h-4 inline-block mr-2 text-red-700" />}
                          {entry.action}
                        </span>
                        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(entry.timestamp).toLocaleString()}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">{entry.employeeName}</span>: {entry.details}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default EmployeeManagementSystem;
