class TerminalWidget {
  constructor() {
    this.panel = document.querySelector('.terminal-panel');
    this.toggle = document.querySelector('.terminal-toggle');
    this.body = document.querySelector('.terminal-body');
    this.input = document.querySelector('.terminal-input');
    this.history = [];
    this.historyIndex = -1;
    if (!this.panel || !this.toggle) return;
    this.init();
  }

  init() {
    this.toggle.addEventListener('click', () => this.togglePanel());
    this.input.addEventListener('keydown', (e) => this.handleInput(e));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.panel.classList.contains('open')) {
        this.closePanel();
      }
    });
    this.addWelcomeMessage();
  }

  togglePanel() {
    if (this.panel.classList.contains('open')) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  openPanel() {
    this.panel.classList.add('open');
    this.input.focus();
  }

  closePanel() {
    this.panel.classList.remove('open');
  }

  addWelcomeMessage() {
    this.addLine('output', 'Platform & DevOps Terminal v1.0');
    this.addLine('output', 'Type <span class="accent">help</span> for available commands.\n');
  }

  handleInput(e) {
    if (e.key === 'Enter') {
      const cmd = this.input.value.trim();
      if (cmd) {
        this.history.push(cmd);
        this.historyIndex = this.history.length;
        this.processCommand(cmd);
      }
      this.input.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = '';
      }
    }
  }

  addLine(type, content) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (type === 'command') {
      line.innerHTML = `<span class="prompt">❯ </span><span class="command">${this.escapeHtml(content)}</span>`;
    } else {
      line.innerHTML = content;
    }
    this.body.appendChild(line);
    this.body.scrollTop = this.body.scrollHeight;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  processCommand(cmd) {
    this.addLine('command', cmd);
    const lower = cmd.toLowerCase().trim();

    const commands = {
      help: () => [
        'Available commands:',
        '  <span class="accent">whoami</span>   — About me',
        '  <span class="accent">skills</span>   — Technical skills',
        '  <span class="accent">projects</span> — Featured projects',
        '  <span class="accent">contact</span>  — Contact information',
        '  <span class="accent">resume</span>   — Download resume',
        '  <span class="accent">blog</span>     — Visit blog',
        '  <span class="accent">clear</span>    — Clear terminal',
        '  <span class="accent">sudo hire-me</span> — ;)'
      ],
      whoami: () => [
        'Rohit Kalyan Kandulapati',
        'Platform & DevOps Engineer',
        'Based in Hyderabad, India',
        'Currently at <span class="accent">Carelon Global Solutions</span>',
        'CKA Certified | AWS | Kubernetes | GitOps'
      ],
      skills: () => [
        '<span class="accent">Cloud & Orchestration:</span> AWS, EKS, Kubernetes, Docker',
        '<span class="accent">IaC & Config:</span> Terraform, Ansible, Helm',
        '<span class="accent">CI/CD & GitOps:</span> Jenkins, Argo CD, GitHub Actions',
        '<span class="accent">Languages & OS:</span> Python, Bash, Linux'
      ],
      projects: () => [
        '<span class="accent">QR Code Generator</span> — Cloud-native DevOps platform on AWS EKS',
        '  <span class="link">https://github.com/rohit-kandulapati/devops-qr-code</span>',
        '',
        '<span class="accent">Kafka KRaft</span> — Custom Alpine Kafka image, KRaft mode',
        '  <span class="link">https://github.com/rohit-kandulapati/kafka-kraft-alpine</span>'
      ],
      contact: () => [
        '<span class="accent">GitHub:</span>   github.com/rohit-kandulapati',
        '<span class="accent">LinkedIn:</span> linkedin.com/in/rohit-kandulapati',
        '<span class="accent">Email:</span>    rohitkalyank@outlook.com'
      ],
      resume: () => {
        window.open('assets/RohitKandulapati_DevOps_Resume.pdf', '_blank');
        return ['Opening resume...'];
      },
      blog: () => {
        window.open('https://blog.rohitkalyan.in', '_blank');
        return ['Opening blog...'];
      },
      clear: () => {
        this.body.innerHTML = '';
        return [];
      },
      "sudo hire-me": () => {
        window.location.href = "mailto:rohitkalyank@outlook.com?subject=Hire%20Rohit%20Kalyan%20Kandulapati&body=Hi%20Rohit%2C%0A%0AI%27d%20like%20to%20discuss%20a%20potential%20opportunity.%0A%0ABest%20regards";
        return [
          "[APPROVED] Excellent choice!",
          "Opening email client for rohitkalyank@outlook.com...",
          '<span class="accent">Subject: Hire Rohit Kalyan Kandulapati</span>'
        ];
      }
    };

    const handler = commands[lower];
    if (handler) {
      const lines = handler();
      if (lines.length > 0) {
        setTimeout(() => {
          lines.forEach((line, i) => {
            setTimeout(() => this.addLine('output', line), (i + 1) * 40);
          });
          setTimeout(() => this.addLine('output', ''), (lines.length + 1) * 40);
        }, 100);
      }
    } else if (lower) {
      this.addLine('output', `Command not found: ${this.escapeHtml(cmd)}. Type <span class="accent">help</span> for available commands.\n`);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TerminalWidget();
});
