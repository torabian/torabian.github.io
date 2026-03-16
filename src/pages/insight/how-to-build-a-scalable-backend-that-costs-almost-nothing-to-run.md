# How to Build a Scalable Backend That Costs Almost Nothing to Run

Almost every software, mobile application, or website needs a "backend." This part of a software product
usually handles the database, manages users, and processes transactions. It also provides APIs for mobile apps and web applications.

After 20 years of experience in the business, I have seen most of the paths small startups and large enterprises take, and what is helpful to consider from the beginning of a project.

## Why a Good Backend Matters and Changes the Future of a Digital Product

Let's assume you've built the product and customers are using it. Over a short period,
it becomes hard to add features, debugging takes longer, and release cycles slow down.
The goal of the software or app was to solve a business problem, but now maintaining
the software itself becomes the main task.

Some product managers try to solve this issue by adding more people to the team, without
addressing the real problem: a simple, reliable backend is often the bottleneck
of any web or mobile app. The fact is, there isn't a linear relation between resources needed
to run software and the number of users. Large apps, such as WhatsApp, have been running with the same amount of
human resources from 100K users to millions over a long period.

## Top Strategies to Expect in Your Backend Systems

Although building anything in life is challenging, the backend of a project
doesn't have to be unnecessarily hard. Regardless of who is building it, keep the following
headlines in mind when creating your backend system.

## Technology Doesn't Matter? That's Wrong

You may have heard things like:

- “It would work with any programming language.”
- “It doesn’t matter which server it runs on.”
- “All databases are basically the same.”

The reality is, subtle differences in any aspect of a project — not just software — can have a huge impact
after the initial stages.

For example, if you are using a programming language such as Golang, your binaries are small even for large
projects, they are standalone installable, and often do not need advanced configuration to keep them running.
They can also be configured to run automatically and installed by a sysadmin without access to the development team.
Compare this to a scripting language such as Ruby, PHP, or Node.js, which require constant maintenance
just to keep running. Of course, similar results can be achieved if someone really wants to, but that is not the usual practice.

For a large enterprise owning 25% of the energy market in Europe, paying
€90,000 monthly for a database and 20 people to maintain MongoDB may not matter. But for a small product,
with a limited profit margin, even small cost differences matter. Reducing operational costs from $10,000 to $500
is $9,500 saved — significant for a small team deciding the fate of their survival.

Therefore, it is critical to choose the right tools for the job from the beginning. In most cases, you want
a relational database with compiled, extremely fast binaries to execute your business logic,
such as SQL databases and the Golang programming language.

## Avoid Excessive Use of External Libraries

Many projects I’ve seen over the past 10 years rely heavily on external tools: Keycloak, Firebase,
build tools like Fastlane, and hundreds more. I remember when I was starting out,
none of these existed, yet we managed to build all features with just 4–5 people.

Outsourcing major parts of the application and depending on external tools does not save time;
it adds cost and forces you to adapt your workflow.

Examples:

- You don’t need external identity management. Build it inside your product. Security can be handled properly,
  and by not using common solutions in obvious ways, you can gain security through obscurity.
- Most apps do not need advanced CI/CD automation. If your app is released monthly, just build it locally and deploy.
  This saves hours of maintenance.
- Many projects can be maintained with 10–15 GB of SQL tables. Large 1TB databases are often unnecessary; careful design with standard tables is usually sufficient.

Fear drives developers and project managers to avoid new approaches. If a major product solves an issue, take a look at how it works. Don’t be intimidated by terms like "load balancer websocket handling"; in the end, it’s just multiple instances of the same app and a pool of socket connections.

## Avoid Shiny Tools That Emerge Every Weekend

For most products, new tools are distractions: new deployment interfaces, databases, CI/CD tools.
Many critical programs that generate billions of dollars are written in C, C++, and PHP — proving that core tools rarely change.

For small teams with tight budgets, constantly chasing new front-end frameworks or libraries is unnecessary.
The focus should always be on solving real-world problems, not rewriting code constantly.

## Stick to Established Databases

The database stores information — mostly the backend’s job. Relational databases have been the standard for decades.
Oracle, MySQL, SQLite, and SQL Server have been dominant for a long time.

The explosion of new databases can overwhelm teams. In most cases, sticking to a major database is enough.
Adding new brands for such a critical part of the app complicates long-term maintenance.

Although ORMs (like Entity Framework) accelerate work initially, serious applications often require writing plain SQL later.
For new projects, I advise avoiding ORMs altogether and writing simple SQL directly, which makes maintenance minimal and extends the software’s life for decades.

In the Node.js ecosystem, tools like TypeORM, Sequelize, and Sails ORM are distractions.
Writing SQL scripts manually and managing them carefully is more reliable, especially for critical systems like banks.

Non-relational databases like MongoDB may seem convenient at first, but they introduce long-term risks if the data is important or critical.

## Export a Clear API Spec or SDKs

A major cost in development comes from not knowing what exists in the system.
Most projects plan only 2 weeks ahead, features get forgotten, and developers leave,
leaving no clear understanding of the backend’s capabilities.

API specs, via Swagger/OpenAPI, are essential, but only document request and response data.
Documenting logic, error codes, and workflows adds enormous value.

Even if you are the sole developer, proper documentation ensures that future you can understand the system in 2 years.

## Avoid Premature Scaling

There is a tendency to overinvest in scaling. Reality: 90% of products fail.
Overbuilding infrastructure for a product unlikely to succeed is wasted effort and resources.

Focus on making the backend reliable, avoiding flashy features like premature scaling.
For most products, even useful apps will never reach thousands of users quickly.

## Conclusion

To say how to build a zero maintance backend is hard, but as summary:

- Use reliable languages, such as Go, and Java
- Write most things in house
- Avoid techy flashy stuff which doesn't serve
- Document, code and API
- Make it self installable

Hope this content did help a bit, so you can have best out of your budget.
