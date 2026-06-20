// ==================== PREMIUM ENHANCEMENTS ====================

function __peEscapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

// 1. Premium Loading States
class LoadingStates {
  static showSkeleton(containerId, type = 'card') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const skeletons = {
      card: `
        <div style="padding: 20px; background: var(--surface); border-radius: 16px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 50px; height: 50px; background: var(--bg-secondary); border-radius: 12px; animation: pulse 1.5s infinite;"></div>
            <div style="flex: 1;">
              <div style="width: 60%; height: 16px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 8px; animation: pulse 1.5s infinite;"></div>
              <div style="width: 40%; height: 12px; background: var(--bg-secondary); border-radius: 8px; animation: pulse 1.5s infinite;"></div>
            </div>
          </div>
        </div>
      `,
      list: `
        <div style="padding: 16px; background: var(--surface); border-radius: 16px; margin-bottom: 8px;">
          <div style="width: 100%; height: 14px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 8px; animation: pulse 1.5s infinite;"></div>
          <div style="width: 70%; height: 12px; background: var(--bg-secondary); border-radius: 8px; animation: pulse 1.5s infinite;"></div>
        </div>
      `,
      avatar: `
        <div style="width: 60px; height: 60px; background: var(--bg-secondary); border-radius: 50%; animation: pulse 1.5s infinite;"></div>
      `
    };
    
    container.innerHTML = skeletons[type] || skeletons.card;
  }
}

// 2. Premium Error Handling
class ErrorHandler {
  static show(message, retryCallback = null) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 16px;
      right: 16px;
      padding: 16px;
      background: linear-gradient(135deg, #EF4444, #DC2626);
      color: white;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 10000;
      box-shadow: 0 8px 30px rgba(239, 68, 68, 0.4);
      animation: slideUp 0.3s ease;
    `;
    
    errorDiv.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span style="font-size: 20px;">⚠️</span>
        <span style="font-weight: 600;">${__peEscapeHtml(message)}</span>
      </div>
      ${retryCallback ? '<button onclick="this.parentElement.remove()" style="background: white; color: #EF4444; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700;">إعادة</button>' : ''}
    `;
    
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// 3. Premium Success Notification
class SuccessNotification {
  static show(message, icon = '✅') {
    const notif = document.createElement('div');
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      left: 20px;
      max-width: 400px;
      margin: 0 auto;
      padding: 16px;
      background: linear-gradient(135deg, #10B981, #059669);
      color: white;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 10000;
      box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
      animation: slideDown 0.3s ease;
    `;
    
    notif.innerHTML = `
      <span style="font-size: 24px;">${icon}</span>
      <span style="font-weight: 700; font-size: 15px;">${__peEscapeHtml(message)}</span>
    `;
    
    document.body.appendChild(notif);
    setTimeout(() => {
      notif.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => notif.remove(), 300);
    }, 3000);
  }
}

// 4. Premium Input Validation
class InputValidator {
  static validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validatePassword(password) {
    return password.length >= 6;
  }

  static validateName(name) {
    return name.length >= 2 && name.length <= 50;
  }

  static validateCode(code) {
    return code.length === 6 && /^[A-Z0-9]+$/i.test(code);
  }

  static showInputError(inputId, message) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.style.borderColor = '#EF4444';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.2)';
    
    let errorEl = input.parentElement.querySelector('.input-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'input-error';
      errorEl.style.cssText = 'color: #EF4444; font-size: 12px; margin-top: 4px;';
      input.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
    
    setTimeout(() => {
      input.style.borderColor = '';
      input.style.boxShadow = '';
      errorEl.remove();
    }, 3000);
  }
}

// 5. Premium Accessibility
class Accessibility {
  static addAriaLabels() {
    // Add aria labels to buttons
    document.querySelectorAll('button').forEach(btn => {
      if (!btn.getAttribute('aria-label')) {
        const text = btn.textContent.trim();
        if (text) btn.setAttribute('aria-label', text);
      }
    });
    
    // Add role attributes
    document.querySelectorAll('.nav').forEach(nav => {
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'التنقل الرئيسي');
    });
    
    document.querySelectorAll('.screen').forEach(screen => {
      screen.setAttribute('role', 'main');
    });
  }

  static addFocusStyles() {
    const style = document.createElement('style');
    style.textContent = `
      button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
        outline: 3px solid var(--primary);
        outline-offset: 2px;
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    document.head.appendChild(style);
  }
}

// 6. Premium Offline Indicator
class OfflineIndicator {
  static show() {
    let indicator = document.getElementById('offlineIndicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'offlineIndicator';
      indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        padding: 8px;
        background: linear-gradient(135deg, #F59E0B, #D97706);
        color: white;
        text-align: center;
        font-weight: 700;
        font-size: 13px;
        z-index: 10000;
      `;
      indicator.innerHTML = '📱 أنت غير متصل بالإنترنت - البيانات محفوظة محلياً';
      document.body.appendChild(indicator);
    }
  }

  static hide() {
    const indicator = document.getElementById('offlineIndicator');
    if (indicator) indicator.remove();
  }

  static init() {
    window.addEventListener('online', () => this.hide());
    window.addEventListener('offline', () => this.show());
    if (!navigator.onLine) this.show();
  }
}

// 7. Premium Haptic Feedback
class HapticFeedback {
  static light() {
    if (navigator.vibrate) navigator.vibrate(10);
  }

  static medium() {
    if (navigator.vibrate) navigator.vibrate(20);
  }

  static heavy() {
    if (navigator.vibrate) navigator.vibrate([30, 50, 30]);
  }

  static success() {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  }

  static error() {
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
  }
}

// 8. Premium Animation Utilities
class AnimationUtils {
  static staggeredFadeIn(elements, delay = 50) {
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * delay);
    });
  }

  static scaleIn(element) {
    element.style.transform = 'scale(0.8)';
    element.style.opacity = '0';
    setTimeout(() => {
      element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      element.style.transform = 'scale(1)';
      element.style.opacity = '1';
    }, 10);
  }

  static countUp(element, target, duration = 1000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const update = () => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
      } else {
        element.textContent = Math.floor(start);
        requestAnimationFrame(update);
      }
    };
    
    update();
  }
}

// 9. Premium Form Handler
class FormHandler {
  static validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], input[data-required]');
    
    inputs.forEach(input => {
      const value = input.value.trim();
      const type = input.dataset.type || 'text';
      
      if (!value) {
        InputValidator.showInputError(input.id, 'هذا الحقل مطلوب');
        isValid = false;
      } else if (type === 'email' && !InputValidator.validateEmail(value)) {
        InputValidator.showInputError(input.id, 'البريد الإلكتروني غير صحيح');
        isValid = false;
      } else if (type === 'password' && !InputValidator.validatePassword(value)) {
        InputValidator.showInputError(input.id, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
      }
    });
    
    return isValid;
  }

  static clearForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.querySelectorAll('input').forEach(input => {
      input.value = '';
      input.style.borderColor = '';
      input.style.boxShadow = '';
    });
  }
}

// 10. Premium Data Sync Status
class SyncStatus {
  static show(status) {
    const colors = {
      syncing: { bg: '#3B82F6', icon: '🔄', text: 'جاري المزامنة...' },
      success: { bg: '#10B981', icon: '✅', text: 'تمت المزامنة' },
      error: { bg: '#EF4444', icon: '❌', text: 'فشلت المزامنة' },
      offline: { bg: '#F59E0B', icon: '📱', text: 'وضع عدم الاتصال' }
    };
    
    const config = colors[status] || colors.offline;
    
    let indicator = document.getElementById('syncStatus');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.id = 'syncStatus';
      indicator.style.cssText = `
        position: fixed;
        top: 80px;
        right: 16px;
        padding: 8px 16px;
        background: ${config.bg};
        color: white;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 6px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(indicator);
    }
    
    indicator.style.background = config.bg;
    indicator.innerHTML = `${config.icon} ${config.text}`;
    
    if (status !== 'syncing') {
      setTimeout(() => indicator.remove(), 3000);
    }
  }
}

// Initialize offline detection
OfflineIndicator.init();
