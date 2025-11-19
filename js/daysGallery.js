// ==========================================
// Days Gallery Functionality with Keyboard Support (优化版)
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.day-slide');
  const btnCloseArr = document.querySelectorAll('.btn-close');

  // 展开幻灯片的函数
  function expandSlide(slide) {
    const hasActiveSlide = Array.from(slide.parentElement.children).some(s => s.classList.contains('active'));
    
    if (!slide.classList.contains('active') && !hasActiveSlide) {
      // 激活当前幻灯片
      slide.classList.remove('anim-in', 'last-viewed');
      slide.classList.add('active');
      slide.setAttribute('aria-expanded', 'true');

      // 其他幻灯片添加退出动画
      Array.from(slide.parentElement.children).forEach(sibling => {
        if (sibling !== slide) {
          sibling.classList.remove('anim-in', 'last-viewed');
          sibling.classList.add('anim-out');
          sibling.setAttribute('aria-expanded', 'false');
          // 移除其他幻灯片内容的 tabindex
          sibling.querySelectorAll('.day-info li, .btn-close').forEach(el => {
            el.setAttribute('tabindex', '-1');
          });
        }
      });

      // 恢复当前幻灯片内容的 tabindex
      slide.querySelectorAll('.day-info li').forEach(el => {
        el.setAttribute('tabindex', '0');
      });
      
      // 确保关闭按钮可以被 focus
      const closeBtn = slide.querySelector('.btn-close');
      if (closeBtn) {
        closeBtn.setAttribute('tabindex', '0');
      }

      // 减少延迟时间，快速聚焦到第一个内容项
      setTimeout(() => {
        const firstItem = slide.querySelector('.day-info li');
        if (firstItem) {
          firstItem.focus();
        }
      }, 150); // 从 300ms 改为 150ms
    }
  }

  // 关闭幻灯片的函数
  function closeSlide(slide) {
    slide.classList.remove('active', 'anim-in');
    slide.classList.add('last-viewed');
    slide.setAttribute('aria-expanded', 'false');

    // 移除当前幻灯片内容的 tabindex
    slide.querySelectorAll('.day-info li, .btn-close').forEach(el => {
      el.setAttribute('tabindex', '-1');
    });

    // 其他幻灯片恢复显示
    Array.from(slide.parentElement.children).forEach(sibling => {
      if (sibling !== slide) {
        sibling.classList.remove('anim-out');
        sibling.classList.add('anim-in');
      }
    });

    // 快速聚焦回幻灯片本身
    setTimeout(() => {
      slide.focus();
    }, 50); // 从 100ms 改为 50ms
  }

  // 初始化：隐藏未激活幻灯片的内容
  slides.forEach(slide => {
    if (!slide.classList.contains('active')) {
      slide.querySelectorAll('.day-info li, .btn-close').forEach(el => {
        el.setAttribute('tabindex', '-1');
      });
    }
  });

  // 鼠标点击展开幻灯片
  slides.forEach(slide => {
    slide.addEventListener('click', function (e) {
      if (!e.target.closest('.btn-close')) {
        expandSlide(this);
      }
    });

    // 键盘支持：按 Enter 或 Space 展开
    slide.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!e.target.closest('.btn-close')) {
          expandSlide(this);
        }
      }
    });
  });

  // 关闭按钮功能
  btnCloseArr.forEach(btn => {
    // 鼠标点击关闭
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const slide = this.closest('.day-slide');
      closeSlide(slide);
    });

    // 键盘支持：按 Enter 或 Space 关闭
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        e.stopPropagation();
        const slide = this.closest('.day-slide');
        closeSlide(slide);
      }
    });
  });

  // 全局键盘支持：按 Escape 关闭激活的幻灯片
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const activeSlide = document.querySelector('.day-slide.active');
      if (activeSlide) {
        closeSlide(activeSlide);
      }
    }
  });
});
