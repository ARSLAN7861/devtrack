export interface ProjectMilestone {
  cycle: number
  title: string
  description: string
  deliverable: string
}

export const projects: {
  sql: ProjectMilestone[]
  linux: ProjectMilestone[]
  k8s: ProjectMilestone[]
} = {
  sql: [
    {
      cycle: 1,
      title: 'Query a Real Dataset',
      description: 'Download a public dataset from Kaggle or data.world, import it into PostgreSQL, and write 15 analytical queries that would be meaningful to a business stakeholder. Each query must have a comment explaining what business question it answers.',
      deliverable: 'SQL file with 15 queries + comments explaining each. Upload to GitHub.',
    },
    {
      cycle: 2,
      title: 'Sales Analytics Schema',
      description: 'Design and implement a normalized sales database schema from scratch. Include tables for customers, products, orders, and order items. Write 20 analytical queries ranging from simple aggregations to multi-table joins with window functions.',
      deliverable: 'Schema DDL file + 20 analytical queries. All queries must run without errors on a fresh import.',
    },
    {
      cycle: 3,
      title: 'LeetCode SQL Sprint',
      description: 'Solve 15 LeetCode SQL problems at Medium difficulty. For each solution, write a comment explaining your approach, why you chose a JOIN vs subquery vs window function, and what the time complexity is.',
      deliverable: '15 LeetCode SQL solutions (Medium level) with explanations. Submit as a single .sql file or a README linking to your LeetCode profile.',
    },
    {
      cycle: 4,
      title: 'Schema Redesign + Performance Proof',
      description: 'Take an existing schema with performance problems (provided or self-chosen) and redesign it. Document the before state, your changes (normalization, indexing), and prove the improvement with EXPLAIN ANALYZE output before and after.',
      deliverable: 'Before schema + after schema + EXPLAIN ANALYZE comparison for at least 3 queries. Include a written analysis.',
    },
    {
      cycle: 6,
      title: 'Food Delivery App Database',
      description: 'Build the complete database for a food delivery app: restaurants, menus, customers, orders, order_items, drivers, and deliveries. Include full schema with constraints, indexes, stored procedures for order processing, triggers for rating updates, and a documented runbook.',
      deliverable: 'Full schema DDL, seed data, stored procedures, triggers, indexes, and a runbook.md documenting maintenance procedures.',
    },
  ],
  linux: [
    {
      cycle: 1,
      title: 'Multi-User Environment Setup',
      description: 'Write a bash script that sets up a multi-user Linux environment: creates three users (admin, developer, analyst), sets appropriate groups and permissions, creates a shared /data/team directory with correct group ownership, and configures sudo access only for admin.',
      deliverable: 'setup_users.sh script that runs idempotently. Must handle the case where users already exist.',
    },
    {
      cycle: 2,
      title: 'Log Parser Pipeline',
      description: 'Write a series of shell one-liners and small pipelines to analyze a 50k-line Apache access log. Answer: top 10 IPs, top 10 URLs, error rate by hour, bandwidth usage by IP, and suspicious activity (>1000 requests from one IP).',
      deliverable: 'analyze_logs.sh with clearly commented sections for each analysis task. Must produce clean output.',
    },
    {
      cycle: 3,
      title: 'Backup Automation Script',
      description: 'Write a complete backup.sh that: backs up a directory with a timestamp, compresses with gzip, keeps only the last 7 backups, logs every run to /var/log/backup.log, handles errors gracefully, sends exit code 1 on failure.',
      deliverable: 'backup.sh with full error handling, rotation logic, and logging. Script must be idempotent and pass ShellCheck with no errors.',
    },
    {
      cycle: 6,
      title: 'Idempotent Server Setup Script',
      description: 'Write a production-quality setup.sh that: installs necessary packages, creates application user, configures SSH (disables password auth, changes port), sets up UFW rules, installs and configures fail2ban, creates a systemd service for a demo app.',
      deliverable: 'setup.sh that is safe to run multiple times on the same server without breaking anything. Passes ShellCheck. Includes a README explaining each step.',
    },
  ],
  k8s: [
    {
      cycle: 1,
      title: 'Containerize an App',
      description: 'Take a simple web application (Node.js, Python Flask, or similar) and containerize it. Write a Dockerfile following best practices: non-root user, multi-stage build, minimal base image, health check. Add a docker-compose.yml that brings up the app with a database.',
      deliverable: 'Dockerfile + docker-compose.yml. App must start with "docker-compose up" and be accessible on localhost. Push image to Docker Hub.',
    },
    {
      cycle: 2,
      title: 'Deploy to Kubernetes',
      description: 'Take the containerized app from Project 1 and deploy it to minikube. Write Deployment, Service, and ConfigMap manifests. Scale to 3 replicas, expose via NodePort, and demonstrate a rolling update by changing the image tag.',
      deliverable: 'All Kubernetes manifests in a k8s/ directory. README with commands to deploy from scratch. Screenshot of app running and kubectl get pods showing 3 replicas.',
    },
    {
      cycle: 4,
      title: '3-Tier Secured App',
      description: 'Deploy a complete 3-tier application (frontend, API, database) with production-grade security: Ingress for routing, NetworkPolicy to restrict pod communication, RBAC for a deploy ServiceAccount, Secrets for database credentials, and resource limits on all pods.',
      deliverable: 'Complete k8s/ manifests directory. All 3 tiers running, Ingress routing working, NetworkPolicy blocking unauthorized traffic (test with a curl from a restricted pod).',
    },
    {
      cycle: 6,
      title: 'Production-Grade Helm Deployment',
      description: 'Convert your 3-tier app into a Helm chart with configurable values.yaml. Add Prometheus monitoring with custom alerts, configure HPA for the API tier, set PodDisruptionBudgets, and write a runbook.md documenting deployment, rollback, and incident response procedures.',
      deliverable: 'Helm chart directory with values.yaml. Prometheus + Grafana deployed via Helm showing app metrics. HPA scaling demonstration. runbook.md with deployment and incident response procedures.',
    },
  ],
}

export function getProjectsForCycle(cycle: number) {
  return {
    sql: projects.sql.find(p => p.cycle === cycle) ?? null,
    linux: projects.linux.find(p => p.cycle === cycle) ?? null,
    k8s: projects.k8s.find(p => p.cycle === cycle) ?? null,
  }
}
