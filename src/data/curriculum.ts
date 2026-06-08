import type { DayContent } from '../store/types'

export const curriculum: DayContent[] = [
  // ─── WEEK 1 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 1, weekNumber: 1, skill: 'sql',
    topic: 'Relational Model & Basic SELECT',
    objectives: [
      'Understand the relational model: tables, rows, columns, keys',
      'Install and connect to PostgreSQL via psql',
      'Write SELECT, WHERE, ORDER BY, and LIMIT queries',
      'Understand data types: INTEGER, TEXT, BOOLEAN, TIMESTAMP',
    ],
    resources: [
      { title: 'PostgreSQL Official Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial.html', type: 'docs' },
      { title: 'SQL Full Course – freeCodeCamp', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', type: 'video' },
      { title: 'SQLZoo: SELECT basics', url: 'https://sqlzoo.net/wiki/SELECT_basics', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 2, weekNumber: 1, skill: 'linux',
    topic: 'Filesystem Hierarchy & Navigation',
    objectives: [
      'Understand the Linux FHS: /, /home, /etc, /var, /usr, /bin',
      'Navigate with cd, ls, pwd, tree',
      'File operations: cp, mv, rm, mkdir, touch',
      'Understand absolute vs relative paths',
    ],
    resources: [
      { title: 'Linux FHS Reference', url: 'https://refspecs.linuxfoundation.org/FHS_3.0/fhs/index.html', type: 'docs' },
      { title: 'Linux Command Line Basics – freeCodeCamp', url: 'https://www.youtube.com/watch?v=ZtqBQ68cfJc', type: 'video' },
      { title: 'OverTheWire: Bandit (Levels 0-5)', url: 'https://overthewire.org/wargames/bandit/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 3, weekNumber: 1, skill: 'k8s',
    topic: 'Docker: Containers vs VMs',
    objectives: [
      'Understand containers vs virtual machines: kernel sharing, isolation',
      'Install Docker Desktop and run your first container',
      'Key commands: docker run, ps, stop, rm, images, pull',
      'Understand Docker Hub and image layers',
    ],
    resources: [
      { title: 'Docker Official Get Started', url: 'https://docs.docker.com/get-started/', type: 'docs' },
      { title: 'Docker in 100 Seconds – Fireship', url: 'https://www.youtube.com/watch?v=Gjnup-PuquQ', type: 'video' },
      { title: 'Play with Docker', url: 'https://labs.play-with-docker.com/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 4, weekNumber: 1, skill: 'sql',
    topic: 'Data Types, NULL Handling & Filtering',
    objectives: [
      'Master SQL data types: VARCHAR, NUMERIC, DATE, JSONB',
      'Handle NULLs with IS NULL, IS NOT NULL, COALESCE, NULLIF',
      'String functions: UPPER, LOWER, CONCAT, SUBSTRING, TRIM',
      'Date functions: NOW(), CURRENT_DATE, DATE_TRUNC, EXTRACT',
    ],
    resources: [
      { title: 'PostgreSQL Data Types', url: 'https://www.postgresql.org/docs/current/datatype.html', type: 'docs' },
      { title: 'Mode SQL Tutorial: Data Types', url: 'https://mode.com/sql-tutorial/sql-data-types/', type: 'article' },
      { title: 'HackerRank SQL Challenges', url: 'https://www.hackerrank.com/domains/sql', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 5, weekNumber: 1, skill: 'linux',
    topic: 'Users, Groups & Permissions',
    objectives: [
      'Understand users and groups: /etc/passwd, /etc/group',
      'Create users with useradd, set passwords with passwd',
      'Understand permission bits: rwx for owner, group, others',
      'Use chmod (symbolic and octal), chown, chgrp',
      'Understand sudo and /etc/sudoers',
    ],
    resources: [
      { title: 'Linux Permissions Explained', url: 'https://www.linux.org/threads/file-permissions-chmod.4124/', type: 'article' },
      { title: 'chmod Calculator', url: 'https://chmod-calculator.com/', type: 'practice' },
      { title: 'Linux Users and Groups – DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/how-to-create-a-new-sudo-enabled-user-on-ubuntu', type: 'article' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 2 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 6, weekNumber: 2, skill: 'sql',
    topic: 'INNER & LEFT JOINs',
    objectives: [
      'Understand the conceptual model of a JOIN: matching rows across tables',
      'Write INNER JOIN and understand why rows are excluded',
      'Write LEFT JOIN and understand NULLs for non-matching rows',
      'Join 3+ tables in a single query',
    ],
    resources: [
      { title: 'Visual JOIN guide – codinghorror.com', url: 'https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/', type: 'article' },
      { title: 'SQLZoo: The JOIN operation', url: 'https://sqlzoo.net/wiki/The_JOIN_operation', type: 'practice' },
      { title: 'PostgreSQL JOIN docs', url: 'https://www.postgresql.org/docs/current/queries-table-expressions.html', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 7, weekNumber: 2, skill: 'linux',
    topic: 'Process Management',
    objectives: [
      'View running processes with ps, top, htop',
      'Kill processes: kill, killall, pkill, signals (SIGTERM, SIGKILL)',
      'Run processes in background with &, jobs, fg, bg',
      'Understand process states: running, sleeping, zombie',
    ],
    resources: [
      { title: 'Linux Process Management', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-ps-kill-and-nice-to-manage-processes-in-linux', type: 'article' },
      { title: 'Understanding Linux Processes – YouTube', url: 'https://www.youtube.com/watch?v=TJzltwv75wc', type: 'video' },
      { title: 'OverTheWire: Bandit Levels 6-10', url: 'https://overthewire.org/wargames/bandit/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 8, weekNumber: 2, skill: 'k8s',
    topic: 'Dockerfile Deep Dive',
    objectives: [
      'Write a Dockerfile: FROM, RUN, COPY, WORKDIR, CMD, ENTRYPOINT',
      'Understand layer caching and how to optimize builds',
      'Use docker build, docker run, docker exec, docker logs',
      'Understand multi-stage builds for smaller images',
    ],
    resources: [
      { title: 'Dockerfile Reference', url: 'https://docs.docker.com/engine/reference/builder/', type: 'docs' },
      { title: 'Docker Best Practices – Docker Blog', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'article' },
      { title: 'Docker Tutorial for Beginners – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', type: 'video' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 9, weekNumber: 2, skill: 'sql',
    topic: 'RIGHT, FULL OUTER JOIN & Self-JOINs',
    objectives: [
      'Understand RIGHT JOIN and when you\'d use it vs LEFT JOIN',
      'Understand FULL OUTER JOIN: all rows from both sides',
      'Write self-joins: querying a table against itself',
      'Use table aliases effectively',
    ],
    resources: [
      { title: 'PostgreSQL Full Outer Join', url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-full-outer-join/', type: 'article' },
      { title: 'Self Join Tutorial', url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-self-join/', type: 'article' },
      { title: 'LeetCode SQL: Combine Two Tables', url: 'https://leetcode.com/problems/combine-two-tables/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 10, weekNumber: 2, skill: 'linux',
    topic: 'grep, sed & awk',
    objectives: [
      'Search files with grep: -i, -r, -n, -v, -E flags',
      'Use sed for stream editing: substitution s/old/new/g, deletion',
      'Use awk for field-based text processing',
      'Combine tools with pipes: grep | sed | awk',
    ],
    resources: [
      { title: 'grep, sed, awk – The Grymoire', url: 'https://www.grymoire.com/Unix/Sed.html', type: 'article' },
      { title: 'Linux Text Processing – YouTube', url: 'https://www.youtube.com/watch?v=lhVnv8_Ep9s', type: 'video' },
      { title: 'Awk Tutorial – tutorialspoint', url: 'https://www.tutorialspoint.com/awk/index.htm', type: 'article' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 3 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 11, weekNumber: 3, skill: 'sql',
    topic: 'GROUP BY, HAVING & Aggregations',
    objectives: [
      'Use GROUP BY to group rows for aggregate calculations',
      'Apply COUNT, SUM, AVG, MIN, MAX',
      'Filter groups with HAVING (vs WHERE for rows)',
      'Aggregate across multiple joined tables',
    ],
    resources: [
      { title: 'PostgreSQL GROUP BY', url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-group-by/', type: 'article' },
      { title: 'Mode Analytics: SQL Aggregations', url: 'https://mode.com/sql-tutorial/sql-aggregate-functions/', type: 'article' },
      { title: 'SQLZoo: SUM and COUNT', url: 'https://sqlzoo.net/wiki/SUM_and_COUNT', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 12, weekNumber: 3, skill: 'linux',
    topic: 'Text Processing: cut, sort, uniq',
    objectives: [
      'Extract fields with cut: -d delimiter, -f fields',
      'Sort data with sort: -n numeric, -r reverse, -k field',
      'Remove duplicates with uniq: -c count, -d duplicates only',
      'Build complex analysis pipelines with multiple tools',
    ],
    resources: [
      { title: 'Linux cut Command', url: 'https://www.man7.org/linux/man-pages/man1/cut.1.html', type: 'docs' },
      { title: 'Text Processing in Linux – YouTube', url: 'https://www.youtube.com/watch?v=uVyDdTYMwv0', type: 'video' },
      { title: 'Command Line Challenge', url: 'https://cmdchallenge.com/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 13, weekNumber: 3, skill: 'k8s',
    topic: 'Docker Networking & Docker Compose',
    objectives: [
      'Understand Docker network types: bridge, host, none',
      'Expose ports with -p and EXPOSE',
      'Define multi-container apps with docker-compose.yml',
      'Use docker-compose up/down/logs/exec',
    ],
    resources: [
      { title: 'Docker Networking Overview', url: 'https://docs.docker.com/network/', type: 'docs' },
      { title: 'Docker Compose Tutorial – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=DM65_JyGxCo', type: 'video' },
      { title: 'Docker Compose Reference', url: 'https://docs.docker.com/compose/compose-file/', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 14, weekNumber: 3, skill: 'sql',
    topic: 'Subqueries: Correlated vs Uncorrelated',
    objectives: [
      'Write scalar subqueries in SELECT and WHERE',
      'Understand the difference between correlated and uncorrelated subqueries',
      'Use subqueries with IN, EXISTS, NOT EXISTS',
      'Understand when to use subquery vs JOIN',
    ],
    resources: [
      { title: 'PostgreSQL Subquery Guide', url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-subquery/', type: 'article' },
      { title: 'Correlated Subqueries Explained', url: 'https://www.sqlshack.com/correlated-subquery-in-sql-server/', type: 'article' },
      { title: 'LeetCode: Employees Earning More Than Managers', url: 'https://leetcode.com/problems/employees-earning-more-than-their-managers/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 15, weekNumber: 3, skill: 'linux',
    topic: 'Redirections & Complex Pipelines',
    objectives: [
      'Redirect stdout (>), stderr (2>), both (&>)',
      'Append with >>, read from file with <',
      'Use /dev/null to discard output',
      'Build multi-command pipelines with | and tee',
      'Use xargs to pass command output as arguments',
    ],
    resources: [
      { title: 'Bash Redirections – tldp.org', url: 'https://tldp.org/LDP/abs/html/io-redirection.html', type: 'article' },
      { title: 'Linux Pipes and Redirection – YouTube', url: 'https://www.youtube.com/watch?v=mV_8GbzwZMM', type: 'video' },
      { title: 'Bash Scripting Tutorial', url: 'https://ryanstutorials.net/bash-scripting-tutorial/', type: 'article' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 4 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 16, weekNumber: 4, skill: 'sql',
    topic: 'CTEs (Common Table Expressions)',
    objectives: [
      'Write CTEs with the WITH keyword',
      'Chain multiple CTEs for readable, modular queries',
      'Understand recursive CTEs for hierarchical data',
      'Compare CTEs vs subqueries: readability and performance',
    ],
    resources: [
      { title: 'PostgreSQL CTE Guide', url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-cte/', type: 'article' },
      { title: 'Recursive CTEs Explained', url: 'https://www.postgresql.org/docs/current/queries-with.html', type: 'docs' },
      { title: 'LeetCode: Department Top 3 Salaries', url: 'https://leetcode.com/problems/department-top-three-salaries/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 17, weekNumber: 4, skill: 'linux',
    topic: 'Shell Scripting: Variables, Conditionals & Loops',
    objectives: [
      'Write bash scripts: shebang, variables, quoting rules',
      'Use if/elif/else, test expressions [[ ]], -f, -d, -z, -n',
      'Loop with for, while, until',
      'Read user input with read',
    ],
    resources: [
      { title: 'Bash Scripting Guide – tldp.org', url: 'https://tldp.org/LDP/Bash-Beginners-Guide/html/', type: 'docs' },
      { title: 'Bash Scripting Tutorial – YouTube', url: 'https://www.youtube.com/watch?v=e7BufAVwDiM', type: 'video' },
      { title: 'ShellCheck: bash linter', url: 'https://www.shellcheck.net/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 18, weekNumber: 4, skill: 'k8s',
    topic: 'Kubernetes Mental Model & kubectl',
    objectives: [
      'Understand Kubernetes: control plane, nodes, pods',
      'Install minikube and kubectl',
      'Key commands: kubectl get, describe, apply, delete, logs, exec',
      'Understand YAML manifests and the declarative model',
    ],
    resources: [
      { title: 'Kubernetes Concepts – k8s.io', url: 'https://kubernetes.io/docs/concepts/', type: 'docs' },
      { title: 'Kubernetes Crash Course – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=s_o8dwzRlu4', type: 'video' },
      { title: 'Killercoda: Kubernetes Basics', url: 'https://killercoda.com/kubernetes', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 19, weekNumber: 4, skill: 'sql',
    topic: 'Window Functions Part 1',
    objectives: [
      'Understand window functions vs GROUP BY: rows are kept',
      'Use ROW_NUMBER(), RANK(), DENSE_RANK()',
      'Use PARTITION BY to define windows',
      'Use ORDER BY within the window frame',
    ],
    resources: [
      { title: 'PostgreSQL Window Functions', url: 'https://www.postgresqltutorial.com/postgresql-window-function/', type: 'article' },
      { title: 'Window Functions – Mode Analytics', url: 'https://mode.com/sql-tutorial/sql-window-functions/', type: 'article' },
      { title: 'LeetCode: Rank Scores', url: 'https://leetcode.com/problems/rank-scores/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 20, weekNumber: 4, skill: 'linux',
    topic: 'Shell Scripting: Functions & Error Handling',
    objectives: [
      'Define and call bash functions',
      'Use $?, $!, $0, $@, $# and special variables',
      'Handle errors with set -e, set -u, trap',
      'Write scripts with proper exit codes and error messages',
    ],
    resources: [
      { title: 'Advanced Bash Scripting', url: 'https://tldp.org/LDP/abs/html/', type: 'docs' },
      { title: 'Bash Error Handling – BetterDev', url: 'https://www.youtube.com/watch?v=8LDrVW7Z-RM', type: 'video' },
      { title: 'Exercism: Bash Track', url: 'https://exercism.org/tracks/bash', type: 'practice' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 5 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 21, weekNumber: 5, skill: 'sql',
    topic: 'Window Functions Part 2: LAG, LEAD, NTILE',
    objectives: [
      'Use LAG() and LEAD() to access previous/next row values',
      'Calculate running totals with SUM() OVER ()',
      'Use NTILE() for percentile bucketing',
      'Use FIRST_VALUE() and LAST_VALUE()',
    ],
    resources: [
      { title: 'LAG and LEAD Functions', url: 'https://www.postgresqltutorial.com/postgresql-window-function/postgresql-lag-function/', type: 'article' },
      { title: 'Window Frame Clauses', url: 'https://www.postgresql.org/docs/current/sql-expressions.html#SYNTAX-WINDOW-FUNCTIONS', type: 'docs' },
      { title: 'LeetCode: Department Highest Salary', url: 'https://leetcode.com/problems/department-highest-salary/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 22, weekNumber: 5, skill: 'linux',
    topic: 'SSH & Remote Access',
    objectives: [
      'Generate SSH key pairs: ssh-keygen',
      'Configure key-based authentication: ~/.ssh/authorized_keys',
      'Use ssh config file for shortcuts',
      'Transfer files: scp, rsync',
      'Port forwarding: -L local, -R remote',
    ],
    resources: [
      { title: 'SSH Key Setup – DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-20-04', type: 'article' },
      { title: 'SSH in 100 Seconds – Fireship', url: 'https://www.youtube.com/watch?v=ORcvSkgdA58', type: 'video' },
      { title: 'SSH Config Reference', url: 'https://linux.die.net/man/5/ssh_config', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 23, weekNumber: 5, skill: 'k8s',
    topic: 'Pods, Deployments & ReplicaSets',
    objectives: [
      'Understand Pods as the smallest deployable unit',
      'Write a Pod manifest and deploy it',
      'Understand ReplicaSets: desired count, label selectors',
      'Use Deployments for rolling updates and rollbacks',
      'kubectl rollout status, history, undo',
    ],
    resources: [
      { title: 'Kubernetes Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/', type: 'docs' },
      { title: 'Kubernetes Pods Explained – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=T4Z7visMM4E', type: 'video' },
      { title: 'Killercoda: Deployments', url: 'https://killercoda.com/kubernetes', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 24, weekNumber: 5, skill: 'sql',
    topic: 'EXPLAIN & Query Analysis',
    objectives: [
      'Use EXPLAIN to see query plans: Seq Scan, Index Scan, Hash Join',
      'Use EXPLAIN ANALYZE for actual timing',
      'Understand cost estimates and actual rows',
      'Identify slow operations: sequential scans on large tables',
    ],
    resources: [
      { title: 'PostgreSQL EXPLAIN Guide', url: 'https://www.postgresql.org/docs/current/sql-explain.html', type: 'docs' },
      { title: 'explain.tensor.ru – visual EXPLAIN', url: 'https://explain.tensor.ru/', type: 'practice' },
      { title: 'Use The Index Luke', url: 'https://use-the-index-luke.com/', type: 'article' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 25, weekNumber: 5, skill: 'linux',
    topic: 'Networking Basics: curl, netstat, firewall',
    objectives: [
      'Use curl to make HTTP requests: GET, POST, headers, -v',
      'Use wget for file downloads',
      'Check open ports with netstat, ss',
      'Configure UFW or iptables basics',
    ],
    resources: [
      { title: 'curl Everything – Daniel Stenberg', url: 'https://everything.curl.dev/', type: 'docs' },
      { title: 'Linux Networking – YouTube', url: 'https://www.youtube.com/watch?v=ckqFnpNNcVQ', type: 'video' },
      { title: 'UFW Guide – DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/how-to-set-up-a-firewall-with-ufw-on-ubuntu', type: 'article' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 6 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 26, weekNumber: 6, skill: 'sql',
    topic: 'Indexes & Normalization',
    objectives: [
      'Create B-tree indexes and understand when they\'re used',
      'Understand composite indexes and index selectivity',
      'Learn normalization: 1NF, 2NF, 3NF',
      'Identify anomalies in un-normalized tables',
    ],
    resources: [
      { title: 'PostgreSQL Indexes', url: 'https://www.postgresql.org/docs/current/indexes.html', type: 'docs' },
      { title: 'Database Normalization – YouTube', url: 'https://www.youtube.com/watch?v=GFQaEYEc8_8', type: 'video' },
      { title: 'Use The Index Luke: Index Design', url: 'https://use-the-index-luke.com/sql/where-clause', type: 'article' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 27, weekNumber: 6, skill: 'linux',
    topic: 'systemd: Services & Timers',
    objectives: [
      'Understand systemd units: service, timer, target',
      'Check service status: systemctl status, start, stop, enable, disable',
      'Read logs: journalctl -u service-name, -f, --since',
      'Write a simple .service file',
    ],
    resources: [
      { title: 'systemd Manual', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html', type: 'docs' },
      { title: 'systemd Explained – YouTube', url: 'https://www.youtube.com/watch?v=AtEqbYTLHfs', type: 'video' },
      { title: 'Digital Ocean: systemd Services', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units', type: 'article' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 28, weekNumber: 6, skill: 'k8s',
    topic: 'Services: ClusterIP, NodePort, LoadBalancer',
    objectives: [
      'Understand why Services are needed: Pod IPs are ephemeral',
      'Create ClusterIP for internal cluster communication',
      'Expose apps externally with NodePort',
      'Understand LoadBalancer type for cloud environments',
      'Use kubectl port-forward for local testing',
    ],
    resources: [
      { title: 'Kubernetes Services', url: 'https://kubernetes.io/docs/concepts/services-networking/service/', type: 'docs' },
      { title: 'Kubernetes Networking – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=5cNrTU6o3Fw', type: 'video' },
      { title: 'Killercoda: Services', url: 'https://killercoda.com/kubernetes', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 29, weekNumber: 6, skill: 'sql',
    topic: 'Transactions & ACID',
    objectives: [
      'Understand ACID: Atomicity, Consistency, Isolation, Durability',
      'Use BEGIN, COMMIT, ROLLBACK',
      'Understand isolation levels: READ COMMITTED, REPEATABLE READ, SERIALIZABLE',
      'Understand dirty reads, non-repeatable reads, phantom reads',
    ],
    resources: [
      { title: 'PostgreSQL Transactions', url: 'https://www.postgresql.org/docs/current/tutorial-transactions.html', type: 'docs' },
      { title: 'ACID Transactions Explained', url: 'https://www.youtube.com/watch?v=pomxJOFVcQs', type: 'video' },
      { title: 'Isolation Levels – Martin Fowler', url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/two-phase-commit.html', type: 'article' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 30, weekNumber: 6, skill: 'linux',
    topic: 'Package Management & Cron Jobs',
    objectives: [
      'Understand APT: apt install, remove, update, upgrade, search',
      'Understand package repositories and PPAs',
      'Schedule jobs with crontab: cron syntax, crontab -e',
      'Manage disk: df, du, lsblk, mount',
    ],
    resources: [
      { title: 'APT Package Manager Guide', url: 'https://help.ubuntu.com/community/AptGet/Howto', type: 'article' },
      { title: 'Cron Job Tutorial', url: 'https://www.youtube.com/watch?v=v952m13p-b4', type: 'video' },
      { title: 'Crontab Guru', url: 'https://crontab.guru/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 7 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 31, weekNumber: 7, skill: 'sql',
    topic: 'Views & Materialized Views',
    objectives: [
      'Create and use VIEWs as saved queries',
      'Understand updatable vs non-updatable views',
      'Create MATERIALIZED VIEWs for expensive queries',
      'Refresh materialized views: REFRESH MATERIALIZED VIEW',
    ],
    resources: [
      { title: 'PostgreSQL Views', url: 'https://www.postgresql.org/docs/current/sql-createview.html', type: 'docs' },
      { title: 'Materialized Views Tutorial', url: 'https://www.postgresqltutorial.com/postgresql-views/postgresql-materialized-views/', type: 'article' },
      { title: 'LeetCode: Create a Session Bar Chart', url: 'https://leetcode.com/problems/create-a-session-bar-chart/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 32, weekNumber: 7, skill: 'linux',
    topic: 'Performance Analysis',
    objectives: [
      'Analyze CPU and memory with vmstat, iostat, sar',
      'Trace system calls with strace',
      'Profile a running process with perf',
      'Identify disk I/O bottlenecks with iotop',
    ],
    resources: [
      { title: 'Linux Performance Tools – Brendan Gregg', url: 'https://www.brendangregg.com/linuxperf.html', type: 'article' },
      { title: 'Linux Performance Observability – YouTube', url: 'https://www.youtube.com/watch?v=FJW8nGV4jxY', type: 'video' },
      { title: 'strace man page', url: 'https://www.man7.org/linux/man-pages/man1/strace.1.html', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 33, weekNumber: 7, skill: 'k8s',
    topic: 'ConfigMaps, Secrets & Environment Variables',
    objectives: [
      'Create ConfigMaps for non-sensitive configuration',
      'Create Secrets for sensitive data (base64 encoded)',
      'Mount ConfigMaps/Secrets as env vars or volume files',
      'Understand the difference between opaque and typed secrets',
    ],
    resources: [
      { title: 'Kubernetes ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/', type: 'docs' },
      { title: 'Kubernetes Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/', type: 'docs' },
      { title: 'ConfigMaps vs Secrets – YouTube', url: 'https://www.youtube.com/watch?v=FAnQTgr04mU', type: 'video' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 34, weekNumber: 7, skill: 'sql',
    topic: 'Stored Procedures & Functions',
    objectives: [
      'Create SQL functions with CREATE FUNCTION',
      'Write PL/pgSQL functions with DECLARE, BEGIN, RETURN',
      'Create stored procedures with CREATE PROCEDURE',
      'Use functions in queries and as triggers',
    ],
    resources: [
      { title: 'PostgreSQL PL/pgSQL Guide', url: 'https://www.postgresql.org/docs/current/plpgsql.html', type: 'docs' },
      { title: 'Stored Procedures Tutorial', url: 'https://www.postgresqltutorial.com/postgresql-plpgsql/postgresql-create-procedure/', type: 'article' },
      { title: 'PL/pgSQL Exercises', url: 'https://pgexercises.com/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 35, weekNumber: 7, skill: 'linux',
    topic: 'Shell Scripting Capstone',
    objectives: [
      'Write a complete backup script with rotation logic',
      'Use date, find, tar in combination',
      'Add logging to a file and stderr',
      'Test script with dry-run mode using a flag',
    ],
    resources: [
      { title: 'Bash Scripting Cookbook', url: 'https://tldp.org/LDP/abs/html/', type: 'docs' },
      { title: 'ShellCheck for script linting', url: 'https://www.shellcheck.net/', type: 'practice' },
      { title: 'Linux Shell Scripting Projects – YouTube', url: 'https://www.youtube.com/watch?v=kQ57H5X_VTw', type: 'video' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 8 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 36, weekNumber: 8, skill: 'sql',
    topic: 'Triggers & PL/pgSQL',
    objectives: [
      'Create AFTER INSERT/UPDATE/DELETE triggers',
      'Write trigger functions in PL/pgSQL',
      'Use NEW and OLD row references in triggers',
      'Understand trigger execution order and cascading',
    ],
    resources: [
      { title: 'PostgreSQL Triggers', url: 'https://www.postgresql.org/docs/current/sql-createtrigger.html', type: 'docs' },
      { title: 'Triggers Tutorial', url: 'https://www.postgresqltutorial.com/postgresql-triggers/', type: 'article' },
      { title: 'PL/pgSQL – pg-exercises.com', url: 'https://pgexercises.com/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 37, weekNumber: 8, skill: 'linux',
    topic: 'SSH Hardening & Security',
    objectives: [
      'Disable password auth in /etc/ssh/sshd_config',
      'Change default SSH port',
      'Use fail2ban to block brute-force attacks',
      'Configure AllowUsers, MaxAuthTries, LoginGraceTime',
    ],
    resources: [
      { title: 'SSH Hardening Guide', url: 'https://www.sshaudit.com/', type: 'article' },
      { title: 'Securing SSH – DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/how-to-harden-openssh-on-ubuntu-20-04', type: 'article' },
      { title: 'fail2ban Documentation', url: 'https://www.fail2ban.org/wiki/index.php/Main_Page', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 38, weekNumber: 8, skill: 'k8s',
    topic: 'PersistentVolumes, PVCs & StatefulSets',
    objectives: [
      'Understand PersistentVolume (PV) and PersistentVolumeClaim (PVC)',
      'Understand StorageClasses and dynamic provisioning',
      'Understand why StatefulSets are needed for stateful apps',
      'Deploy a database with StatefulSet + PVC',
    ],
    resources: [
      { title: 'Kubernetes Storage', url: 'https://kubernetes.io/docs/concepts/storage/', type: 'docs' },
      { title: 'StatefulSets Explained – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=pPQKAR1pA9U', type: 'video' },
      { title: 'Kubernetes Storage Tutorial', url: 'https://kubernetes.io/docs/tutorials/stateful-application/basic-stateful-set/', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 39, weekNumber: 8, skill: 'sql',
    topic: 'Schema Migrations & Optimization',
    objectives: [
      'Understand schema migration patterns: ADD COLUMN, ALTER TYPE',
      'Use zero-downtime migration techniques',
      'Compare PostgreSQL vs MySQL: key differences',
      'Optimization patterns: partial indexes, covering indexes',
    ],
    resources: [
      { title: 'Zero Downtime Migrations – braintreepayments', url: 'https://www.braintreepayments.com/blog/safe-operations-for-high-volume-postgresql/', type: 'article' },
      { title: 'PostgreSQL vs MySQL', url: 'https://www.postgresqltutorial.com/postgresql-vs-mysql/', type: 'article' },
      { title: 'Partial Indexes Guide', url: 'https://www.postgresql.org/docs/current/indexes-partial.html', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 40, weekNumber: 8, skill: 'linux',
    topic: 'Linux Networking: Interfaces & Diagnostics',
    objectives: [
      'View and configure interfaces with ip addr, ip route',
      'Diagnose connectivity with ping, traceroute, mtr',
      'Capture traffic with tcpdump',
      'Understand /etc/hosts, /etc/resolv.conf for DNS',
    ],
    resources: [
      { title: 'ip Command Cheat Sheet', url: 'https://www.commandlinux.com/man-page/man8/ip.8.html', type: 'docs' },
      { title: 'Linux Networking Commands – YouTube', url: 'https://www.youtube.com/watch?v=7wNFpD_DnOo', type: 'video' },
      { title: 'tcpdump Tutorial', url: 'https://danielmiessler.com/p/tcpdump/', type: 'article' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 9 ───────────────────────────────────────────────────────────────
  {
    dayNumber: 41, weekNumber: 9, skill: 'sql',
    topic: 'SQL Capstone: Food Delivery Schema Design',
    objectives: [
      'Design a normalized schema for a food delivery app',
      'Tables: users, restaurants, menus, orders, order_items, drivers',
      'Define foreign keys, constraints, and indexes',
      'Write complex analytical queries against the schema',
    ],
    resources: [
      { title: 'Database Design Tutorial', url: 'https://www.lucidchart.com/pages/database-diagram/database-design', type: 'article' },
      { title: 'PostgreSQL Constraints', url: 'https://www.postgresql.org/docs/current/ddl-constraints.html', type: 'docs' },
      { title: 'dbdiagram.io – ERD tool', url: 'https://dbdiagram.io/', type: 'practice' },
    ],
    isProjectDay: true,
    projectTitle: 'Food Delivery App Database Design',
  },
  {
    dayNumber: 42, weekNumber: 9, skill: 'linux',
    topic: 'systemd: Writing Services',
    objectives: [
      'Write a .service unit file from scratch',
      'Configure ExecStart, User, WorkingDirectory, Restart',
      'Enable service to start on boot',
      'Use systemd timers as a cron alternative',
    ],
    resources: [
      { title: 'systemd.service man page', url: 'https://www.freedesktop.org/software/systemd/man/systemd.service.html', type: 'docs' },
      { title: 'Writing systemd Units – YouTube', url: 'https://www.youtube.com/watch?v=N1vgvhiyq0E', type: 'video' },
      { title: 'systemd Timer Units', url: 'https://www.freedesktop.org/software/systemd/man/systemd.timer.html', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 43, weekNumber: 9, skill: 'k8s',
    topic: 'Kubernetes Networking & Ingress',
    objectives: [
      'Understand the Kubernetes networking model: every pod gets an IP',
      'Install an Ingress controller (nginx)',
      'Route traffic to multiple services with Ingress rules',
      'Configure TLS termination in Ingress',
    ],
    resources: [
      { title: 'Kubernetes Ingress', url: 'https://kubernetes.io/docs/concepts/services-networking/ingress/', type: 'docs' },
      { title: 'Ingress Controllers – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=80Ew_fsV4rM', type: 'video' },
      { title: 'NGINX Ingress Controller Docs', url: 'https://kubernetes.github.io/ingress-nginx/', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 44, weekNumber: 9, skill: 'sql',
    topic: 'Capstone: Complex Queries on Food Delivery DB',
    objectives: [
      'Write window functions to rank top restaurants by order volume',
      'Calculate running revenue totals by driver and by day',
      'Find peak hours using DATE_TRUNC and GROUP BY',
      'Identify customers who haven\'t ordered in 30 days',
    ],
    resources: [
      { title: 'PostgreSQL Window Functions Reference', url: 'https://www.postgresql.org/docs/current/functions-window.html', type: 'docs' },
      { title: 'Analytics with PostgreSQL – YouTube', url: 'https://www.youtube.com/watch?v=vuGV0SCGJJ4', type: 'video' },
      { title: 'pgexercises.com', url: 'https://pgexercises.com/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 45, weekNumber: 9, skill: 'linux',
    topic: 'Linux Capstone: Server Setup Script',
    objectives: [
      'Write an idempotent setup.sh script for a fresh server',
      'Install packages, create users, configure SSH',
      'Set up UFW rules and fail2ban',
      'Add logging and make script re-runnable safely',
    ],
    resources: [
      { title: 'Idempotency in Scripts', url: 'https://www.server-world.info/en/note?os=Ubuntu_22.04&p=initial_conf', type: 'article' },
      { title: 'Server Hardening Checklist', url: 'https://github.com/imthenachoman/How-To-Secure-A-Linux-Server', type: 'article' },
      { title: 'ShellCheck', url: 'https://www.shellcheck.net/', type: 'practice' },
    ],
    isProjectDay: true,
    projectTitle: 'Idempotent Server Setup Script',
  },
  // ─── WEEK 10 ──────────────────────────────────────────────────────────────
  {
    dayNumber: 46, weekNumber: 10, skill: 'sql',
    topic: 'Capstone Review: Indexes & Performance',
    objectives: [
      'Run EXPLAIN ANALYZE on capstone queries',
      'Add targeted indexes to slow queries',
      'Compare before/after performance',
      'Document the optimization decisions',
    ],
    resources: [
      { title: 'PostgreSQL Performance Tuning', url: 'https://wiki.postgresql.org/wiki/Performance_Optimization', type: 'docs' },
      { title: 'explain.tensor.ru', url: 'https://explain.tensor.ru/', type: 'practice' },
      { title: 'pganalyze: Index Advisor', url: 'https://pganalyze.com/docs/index-advisor', type: 'article' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 47, weekNumber: 10, skill: 'linux',
    topic: 'Linux Capstone: Log Parser Pipeline',
    objectives: [
      'Parse a 50k-line Apache access log',
      'Extract unique IPs and count requests per IP',
      'Find top 10 requested URLs',
      'Identify 4xx/5xx error rates by hour',
    ],
    resources: [
      { title: 'AWK Log Analysis', url: 'https://www.the-art-of-web.com/system/logs/', type: 'article' },
      { title: 'Log Analysis with Shell Tools – YouTube', url: 'https://www.youtube.com/watch?v=lhVnv8_Ep9s', type: 'video' },
      { title: 'Common Log Format Reference', url: 'https://httpd.apache.org/docs/current/logs.html', type: 'docs' },
    ],
    isProjectDay: true,
    projectTitle: 'Log Parser Pipeline',
  },
  {
    dayNumber: 48, weekNumber: 10, skill: 'k8s',
    topic: 'Network Policies & RBAC',
    objectives: [
      'Write NetworkPolicy to restrict pod-to-pod traffic',
      'Understand RBAC: Roles, ClusterRoles, RoleBindings',
      'Create a Role that allows read-only pod access',
      'Bind the Role to a ServiceAccount',
    ],
    resources: [
      { title: 'Kubernetes RBAC', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/', type: 'docs' },
      { title: 'Network Policies', url: 'https://kubernetes.io/docs/concepts/services-networking/network-policies/', type: 'docs' },
      { title: 'RBAC Explained – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=CnHTCTP8d48', type: 'video' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 49, weekNumber: 10, skill: 'sql',
    topic: 'Capstone: Stored Procedures & Triggers',
    objectives: [
      'Write a stored procedure to process a new order',
      'Add a trigger to update restaurant rating on review insert',
      'Write a function to calculate driver earnings',
      'Test with edge cases: empty orders, null values',
    ],
    resources: [
      { title: 'PL/pgSQL Reference', url: 'https://www.postgresql.org/docs/current/plpgsql.html', type: 'docs' },
      { title: 'PostgreSQL Trigger Examples', url: 'https://www.postgresqltutorial.com/postgresql-triggers/creating-first-trigger-postgresql/', type: 'article' },
      { title: 'pgexercises.com: Advanced', url: 'https://pgexercises.com/questions/aggregates/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 50, weekNumber: 10, skill: 'linux',
    topic: 'Linux Review & Gap-Fill',
    objectives: [
      'Review: permissions, processes, scripting, networking, systemd',
      'Redo any exercises that felt weak',
      'Write a reference cheat sheet of all key commands',
      'Solve 5 Linux challenges from cmdchallenge.com',
    ],
    resources: [
      { title: 'Command Line Challenge', url: 'https://cmdchallenge.com/', type: 'practice' },
      { title: 'Linux Command Reference', url: 'https://www.linux.org/forums/linux-commands.1/', type: 'docs' },
      { title: 'Linux Pocket Guide – O\'Reilly', url: 'https://www.oreilly.com/library/view/linux-pocket-guide/9780596806347/', type: 'article' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 11 ──────────────────────────────────────────────────────────────
  {
    dayNumber: 51, weekNumber: 11, skill: 'sql',
    topic: 'Capstone Polish & Documentation',
    objectives: [
      'Write a full README.md for the food delivery database',
      'Document every table, column, and constraint',
      'Add COMMENT ON TABLE and COMMENT ON COLUMN to schema',
      'Create a migration script for initial schema setup',
    ],
    resources: [
      { title: 'Database Documentation Best Practices', url: 'https://www.sisense.com/blog/database-documentation/', type: 'article' },
      { title: 'PostgreSQL COMMENT', url: 'https://www.postgresql.org/docs/current/sql-comment.html', type: 'docs' },
      { title: 'dbdocs.io – Database Documentation', url: 'https://dbdocs.io/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 52, weekNumber: 11, skill: 'linux',
    topic: 'Package Management Internals',
    objectives: [
      'Understand dpkg vs apt vs snap',
      'Inspect installed packages: dpkg -l, apt list --installed',
      'Hold packages from updating: apt-mark hold',
      'Add a PPA and install a newer version of a package',
    ],
    resources: [
      { title: 'Debian Package Management', url: 'https://www.debian.org/doc/manuals/debian-reference/ch02.en.html', type: 'docs' },
      { title: 'APT Tutorial – YouTube', url: 'https://www.youtube.com/watch?v=G04ilFpfMFc', type: 'video' },
      { title: 'dpkg man page', url: 'https://www.man7.org/linux/man-pages/man1/dpkg.1.html', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 53, weekNumber: 11, skill: 'k8s',
    topic: 'Helm: Charts & Templating',
    objectives: [
      'Understand Helm: package manager for Kubernetes',
      'Install Helm and add a chart repository',
      'Deploy an app with helm install',
      'Customize with values.yaml and --set flags',
      'Understand templates: {{ .Values.xxx }}',
    ],
    resources: [
      { title: 'Helm Documentation', url: 'https://helm.sh/docs/', type: 'docs' },
      { title: 'Helm Tutorial – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=-ykwb1d0DXU', type: 'video' },
      { title: 'Artifact Hub: Helm Charts', url: 'https://artifacthub.io/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 54, weekNumber: 11, skill: 'sql',
    topic: 'SQL Review & LeetCode Sprint',
    objectives: [
      'Solve 5 Medium LeetCode SQL problems',
      'Focus on: window functions, CTEs, self-joins',
      'Review any weak areas identified during capstone',
      'Time yourself: aim for under 15 mins per problem',
    ],
    resources: [
      { title: 'LeetCode SQL Problems', url: 'https://leetcode.com/problemset/database/', type: 'practice' },
      { title: 'SQL Practice – StrataScratch', url: 'https://www.stratascratch.com/', type: 'practice' },
      { title: 'Mode Analytics SQL Tutorial', url: 'https://mode.com/sql-tutorial/', type: 'article' },
    ],
    isProjectDay: true,
    projectTitle: 'LeetCode SQL Sprint',
  },
  {
    dayNumber: 55, weekNumber: 11, skill: 'linux',
    topic: 'Disk Management & File Systems',
    objectives: [
      'Understand disk partitioning: fdisk, parted',
      'Create and mount filesystems: mkfs, mount, /etc/fstab',
      'Manage disk quotas',
      'Use LVM for flexible storage management',
    ],
    resources: [
      { title: 'Linux Disk Management – DigitalOcean', url: 'https://www.digitalocean.com/community/tutorials/how-to-partition-and-format-storage-devices-in-linux', type: 'article' },
      { title: 'LVM Tutorial – YouTube', url: 'https://www.youtube.com/watch?v=scMkYX4Q7nM', type: 'video' },
      { title: 'fstab Reference', url: 'https://www.man7.org/linux/man-pages/man5/fstab.5.html', type: 'docs' },
    ],
    isProjectDay: false,
  },
  // ─── WEEK 12 ──────────────────────────────────────────────────────────────
  {
    dayNumber: 56, weekNumber: 12, skill: 'sql',
    topic: 'Final Capstone: Runbook & Handover',
    objectives: [
      'Write a complete database runbook',
      'Document backup/restore procedures',
      'Document common maintenance queries',
      'Package the entire project as a git repository',
    ],
    resources: [
      { title: 'Writing Database Runbooks', url: 'https://www.pagerduty.com/resources/learn/what-is-a-runbook/', type: 'article' },
      { title: 'PostgreSQL Backup & Restore', url: 'https://www.postgresql.org/docs/current/backup.html', type: 'docs' },
      { title: 'Git for Projects', url: 'https://git-scm.com/book/en/v2', type: 'docs' },
    ],
    isProjectDay: true,
    projectTitle: 'Food Delivery App Database — Final Submission',
  },
  {
    dayNumber: 57, weekNumber: 12, skill: 'linux',
    topic: 'Linux Performance Capstone',
    objectives: [
      'Profile a slow shell script and optimize it',
      'Use strace to debug a failing command',
      'Analyze an iotop/vmstat trace and identify bottleneck',
      'Write a performance diagnosis report',
    ],
    resources: [
      { title: 'Brendan Gregg\'s Performance Blog', url: 'https://www.brendangregg.com/', type: 'article' },
      { title: 'Linux Performance Analysis in 60s', url: 'https://www.youtube.com/watch?v=ZdVpKx6Wmc8', type: 'video' },
      { title: 'strace Tutorial', url: 'https://strace.io/', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 58, weekNumber: 12, skill: 'k8s',
    topic: 'Prometheus & Grafana Monitoring',
    objectives: [
      'Deploy Prometheus + Grafana via Helm',
      'Understand metrics: scraping, targets, labels',
      'Create a basic Grafana dashboard',
      'Use kubectl debug for container debugging',
    ],
    resources: [
      { title: 'Prometheus Documentation', url: 'https://prometheus.io/docs/introduction/overview/', type: 'docs' },
      { title: 'Kubernetes Monitoring – TechWorld with Nana', url: 'https://www.youtube.com/watch?v=QoDqxm7ybLc', type: 'video' },
      { title: 'Grafana Documentation', url: 'https://grafana.com/docs/grafana/latest/', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 59, weekNumber: 12, skill: 'sql',
    topic: 'SQL Comprehensive Review',
    objectives: [
      'Review all SQL topics: joins, aggregations, CTEs, window functions',
      'Attempt 3 Hard LeetCode SQL problems',
      'Review EXPLAIN output and optimization techniques',
      'Identify and fill any remaining knowledge gaps',
    ],
    resources: [
      { title: 'LeetCode Hard SQL', url: 'https://leetcode.com/problemset/database/?difficulty=HARD', type: 'practice' },
      { title: 'StrataScratch Hard Problems', url: 'https://www.stratascratch.com/', type: 'practice' },
      { title: 'PostgreSQL Full Reference', url: 'https://www.postgresql.org/docs/current/', type: 'docs' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 60, weekNumber: 12, skill: 'linux',
    topic: 'Linux Final Review & Multi-User Setup',
    objectives: [
      'Build a complete multi-user environment from scratch',
      'Users: admin, dev, analyst — each with correct permissions',
      'Set up shared directories with group permissions',
      'Configure sudo access for dev user only',
    ],
    resources: [
      { title: 'Linux Multi-User Setup', url: 'https://www.linux.org/threads/multi-user-configuration.4139/', type: 'article' },
      { title: 'Linux Administration – YouTube', url: 'https://www.youtube.com/watch?v=wBp0Rb-ZJak', type: 'video' },
      { title: 'Linux Multi-User Project Exercises', url: 'https://exercism.org/tracks/bash', type: 'practice' },
    ],
    isProjectDay: true,
    projectTitle: 'Multi-User Environment Setup',
  },
  // ─── WEEK 13 ──────────────────────────────────────────────────────────────
  {
    dayNumber: 61, weekNumber: 13, skill: 'sql',
    topic: 'Final SQL Capstone — Review & Polish',
    objectives: [
      'Final review of the food delivery database project',
      'Optimize remaining slow queries',
      'Add missing indexes identified from EXPLAIN output',
      'Prepare final project submission',
    ],
    resources: [
      { title: 'PostgreSQL Performance Wiki', url: 'https://wiki.postgresql.org/wiki/Performance_Optimization', type: 'docs' },
      { title: 'Query Optimization Checklist', url: 'https://use-the-index-luke.com/', type: 'article' },
      { title: 'pgBadger Log Analyzer', url: 'https://pgbadger.darold.net/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 62, weekNumber: 13, skill: 'linux',
    topic: 'Linux Comprehensive Review',
    objectives: [
      'Full review: filesystem, permissions, processes, scripting, networking',
      'Solve 10 OverTheWire Bandit challenges',
      'Create a personal Linux cheat sheet',
      'Identify 3 topics to practice more',
    ],
    resources: [
      { title: 'OverTheWire: Bandit', url: 'https://overthewire.org/wargames/bandit/', type: 'practice' },
      { title: 'Linux Command Line – William Shotts', url: 'https://linuxcommand.org/tlcl.php', type: 'docs' },
      { title: 'Command Line Challenge', url: 'https://cmdchallenge.com/', type: 'practice' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 63, weekNumber: 13, skill: 'k8s',
    topic: 'HPA, Resource Limits & Pod Disruption Budgets',
    objectives: [
      'Configure CPU/memory requests and limits for pods',
      'Set up Horizontal Pod Autoscaler (HPA)',
      'Create PodDisruptionBudget for high-availability',
      'Understand LimitRange and ResourceQuota per namespace',
    ],
    resources: [
      { title: 'Kubernetes Resource Management', url: 'https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/', type: 'docs' },
      { title: 'HPA Documentation', url: 'https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/', type: 'docs' },
      { title: 'K8s Resource Management – YouTube', url: 'https://www.youtube.com/watch?v=kcA4r9I2GGA', type: 'video' },
    ],
    isProjectDay: false,
  },
  {
    dayNumber: 64, weekNumber: 13, skill: 'sql',
    topic: 'SQL Final: Query a Real Dataset',
    objectives: [
      'Download a public dataset (Kaggle or data.world)',
      'Import into PostgreSQL',
      'Write 15 analytical queries with comments',
      'Present findings as if for a business stakeholder',
    ],
    resources: [
      { title: 'Kaggle Datasets', url: 'https://www.kaggle.com/datasets', type: 'practice' },
      { title: 'PostgreSQL COPY command', url: 'https://www.postgresql.org/docs/current/sql-copy.html', type: 'docs' },
      { title: 'data.world Public Datasets', url: 'https://data.world/datasets/open-data', type: 'practice' },
    ],
    isProjectDay: true,
    projectTitle: 'Query a Real Dataset',
  },
  {
    dayNumber: 65, weekNumber: 13, skill: 'k8s',
    topic: 'Final Kubernetes Capstone Review',
    objectives: [
      'Deploy the full 3-tier app: frontend + API + database',
      'Configure Ingress, RBAC, NetworkPolicy, HPA',
      'Add Prometheus monitoring and Grafana dashboard',
      'Write a production runbook for the deployment',
    ],
    resources: [
      { title: 'Production Kubernetes Checklist', url: 'https://learnk8s.io/production-best-practices', type: 'article' },
      { title: 'Kubernetes The Hard Way', url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way', type: 'docs' },
      { title: 'CKAD Practice Exercises', url: 'https://github.com/dgkanatsios/CKAD-exercises', type: 'practice' },
    ],
    isProjectDay: true,
    projectTitle: 'Production-Grade Helm Deployment',
  },
]

export function getDayContent(dayNumber: number): DayContent | null {
  return curriculum.find(d => d.dayNumber === dayNumber) ?? null
}
