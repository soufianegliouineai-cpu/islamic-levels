// ==================== FAMILY & PARENTAL CONTROL SYSTEM ====================

class FamilyManager {
  constructor() {
    this.familyId = null;
    this.members = [];
    this.requests = [];
    this.messages = [];
    this.parentCode = null;
  }

  // Create family
  createFamily(parentName) {
    this.familyId = 'fam-' + Date.now();
    this.parentCode = this.generateCode(6);
    this.members = [{
      id: 'parent-' + Date.now(),
      name: parentName,
      role: 'parent',
      gems: 0,
      xp: 0,
      streak: 0,
      joinedAt: new Date().toISOString(),
      isOnline: true
    }];
    this.saveFamily();
    return { familyId: this.familyId, parentCode: this.parentCode };
  }

  // Join family with code
  joinFamily(childName, code) {
    if (code.length !== 6) return { error: 'كود العائلة يجب أن يكون 6 أحرف' };
    const child = {
      id: 'child-' + Date.now(),
      name: childName,
      role: 'child',
      gems: 0,
      xp: 0,
      streak: 0,
      joinedAt: new Date().toISOString(),
      isOnline: true,
      parentId: null
    };
    this.members.push(child);
    this.saveFamily();
    return { success: true, child };
  }

  // Send request to parent
  sendRequest(childId, type, amount, msg) {
    const req = {
      id: 'req-' + Date.now(),
      childId,
      childName: this.members.find(m => m.id === childId)?.name,
      type,
      amount,
      message: msg,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    this.requests.push(req);
    this.saveFamily();
    return req;
  }

  approveRequest(requestId) {
    const req = this.requests.find(r => r.id === requestId);
    if (req) { req.status = 'approved'; req.approvedAt = new Date().toISOString(); this.saveFamily(); return { success: true }; }
    return { error: 'not found' };
  }

  rejectRequest(requestId) {
    const req = this.requests.find(r => r.id === requestId);
    if (req) { req.status = 'rejected'; this.saveFamily(); return { success: true }; }
    return { error: 'not found' };
  }

  sendMessage(fromId, toId, content) {
    const msg = { id: 'msg-' + Date.now(), from: fromId, to: toId, content, timestamp: new Date().toISOString(), read: false };
    this.messages.push(msg);
    this.saveFamily();
    return msg;
  }

  getMessages(userId1, userId2) {
    return this.messages.filter(m => (m.from === userId1 && m.to === userId2) || (m.from === userId2 && m.to === userId1));
  }

  getMember(memberId) { return this.members.find(m => m.id === memberId); }
  getParent() { return this.members.find(m => m.role === 'parent'); }
  getChildren() { return this.members.filter(m => m.role === 'child'); }

  saveFamily() {
    localStorage.setItem('familyData', JSON.stringify({ familyId: this.familyId, parentCode: this.parentCode, members: this.members, requests: this.requests, messages: this.messages }));
  }

  loadFamily() {
    const data = localStorage.getItem('familyData');
    if (data) {
      const parsed = JSON.parse(data);
      this.familyId = parsed.familyId;
      this.parentCode = parsed.parentCode;
      this.members = parsed.members || [];
      this.requests = parsed.requests || [];
      this.messages = parsed.messages || [];
    }
  }

  generateCode(length) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < length; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  }
}
