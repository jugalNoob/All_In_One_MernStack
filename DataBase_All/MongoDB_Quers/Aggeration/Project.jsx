✅ Real Use Cases with Multiple Aggregation Stages
🛒 1. E-commerce: Top-Selling Products by Category
💼 Used for: Admin dashboard, sales reporting.

Pipeline Stages Used:
$match → $unwind → $group → $sort → $limit

Explanation:
Filter orders by date or region.

Unwind product arrays.

Group by product/category and sum quantity or revenue.

Sort by sales.

Limit top results.

📱 2. Social Media: Trending Hashtags in Last 24 Hours
💼 Used for: Discover feed, analytics.

Pipeline Stages Used:
$match → $unwind → $group → $sort → $limit

Explanation:
Filter posts in the last 24 hours.

Unwind hashtags array.

Group by hashtag and count usage.

Sort by popularity.

Return top N.

🧾 3. Invoice System: Monthly Revenue Trend
💼 Used for: Financial reports, charts.

Pipeline Stages Used:
$match → $project → $group → $sort

Explanation:
Filter paid invoices.

Project month and amount.

Group by month and sum revenue.

Sort chronologically.

🌍 4. Ride-Sharing: Nearby Drivers
💼 Used for: Geolocation, map results.

Pipeline Stages Used:
$geoNear → $project → $limit

Explanation:
Find drivers within X km of user.

Project distance and name.

Limit to top 10.

📚 5. Education App: Student Performance by Subject
💼 Used for: Student dashboard, analytics.

Pipeline Stages Used:
$match → $unwind → $group → $project

Explanation:
Filter tests for a student.

Unwind subjects array.

Group by subject, avg the score.

Project result with subject name.

🧑‍💼 6. Company Org Chart: Get All Employees Under a Manager
💼 Used for: HR system, org tree.

Pipeline Stages Used:
$match → $graphLookup

Explanation:
Match a specific manager.

Recursively find all subordinates.

📊 7. Analytics Dashboard: Multi-metric Stats
💼 Used for: Admin dashboard.

Pipeline Stages Used:
$facet with:

$match + $count (user count)

$group + $avg (avg session time)

$sort + $limit (top countries)

Explanation:
Use $facet to run multiple parallel aggregations and return a single combined result for dashboard widgets.

🧪 8. Archiving Old Data
💼 Used for: Cost optimization, data lifecycle management.

Pipeline Stages Used:
$match → $project → $out

Explanation:
Filter documents older than a year.

Reshape with only necessary fields.

Export to a new "archive" collection.

🧬 9. Search & Pagination for APIs
💼 Used for: Frontend tables, filters.

Pipeline Stages Used:
$match → $sort → $skip → $limit → $project

Explanation:
Filter results by user input.

Sort by a field (e.g., name/date).

Paginate using skip + limit.

Return selected fields only.