# Sistema JASS - Frontend Angular

![Logo JASS](public/assets/images/Gotita.png)

Sistema integrado para la gestión de Juntas Administradoras de Servicios de Saneamiento (JASS) basado en microservicios.

## 📝Project Purpose

El objetivo principal es ofrecer una solución escalable y fácil de mantener, que facilite la administración de usuarios, infraestructura, pagos, distribución de agua, inventario, calidad del agua, reclamos y notificaciones.

## 🛠️ Setup Instructions (Imperatives)
1. **Clone** the repository:  
   `git clone https://github.com/Ronaldinho-cc/vg-sistemJass-english.git`   
2. **Navigate** into frontend:  
   `cd ../ms-water-quality`  
.. **Install** dependencies and **serve** the Angular app:  
   `npm install`  
   `ng serve`
   
## 🧩 How to Use the App (Advice with “should”)
- You **should** open `http://localhost:4200` after both backend and frontend are running.  
- You **should** create a user account to access intefaces the microservices.  

---
## 🚀 Technologies Used

-**Angular 19**: Web application development framework, providing a robust structure and tools for building SPAs (Single Page Applications).
- **TypeScript**: A JavaScript superset that adds static typing, improving code quality and maintainability.
- **Tailwind CSS 4**: A utility-first CSS framework that allows you to quickly build custom layouts directly in HTML markup with highly composable utility classes.
- **SCSS (Sass)**: CSS preprocessor for writing more powerful and maintainable styles with variables, mixins, and nested functions.
- **RxJS**: A reactive programming library that facilitates the handling of asynchronous events and data flows.

## 🎯 Future Plans (Tips and Suggestions)
- **We should** integrate hosting into a deployment application.
- **We should** implement administrator roles to control access to content.
- **We should** schedule training on how to use the system.

  
### Estructura de Carpetas
La siguiente es una descripción detallada de la estructura de carpetas del proyecto y su propósito:

```markdown
. 📂 sistemaJass
├── 📄 README.md
├── 📄 angular.json
├── 📄 package-lock.json
├── 📄 package.json
└── 📂 public/
│  └── 📂 assets/
│    └── 📂 images/
│      ├── 📄 Gotita.png
│  ├── 📄 favicon.ico
└── 📂 src/
│  └── 📂 app/
│    ├── 📄 app.component.css
│    ├── 📄 app.component.html
│    ├── 📄 app.component.spec.ts
│    ├── 📄 app.component.ts
│    ├── 📄 app.config.ts
│    ├── 📄 app.routes.ts
│    └── 📂 core/
│      └── 📂 auth/
│        └── 📂 guards/
│          ├── 📄 admin.guard.ts
│          ├── 📄 auth.guard.ts
│          ├── 📄 client.guard.ts
│          ├── 📄 organization.guard.ts
│        └── 📂 interceptors/
│          ├── 📄 auth.interceptor.ts
│          ├── 📄 error.interceptor.ts
│          ├── 📄 organization.interceptor.ts
│      └── 📂 config/
│        ├── 📄 a
│      └── 📂 models/
│        ├── 📄 auth.model.ts
│        ├── 📄 box.model.ts
│        ├── 📄 common.model.ts
│        ├── 📄 complaint.model.ts
│        ├── 📄 distribution.model.ts
│        ├── 📄 inventory.model.ts
│        ├── 📄 notification.model.ts
│        ├── 📄 organization.model.ts
│        ├── 📄 payment.model.ts
│        ├── 📄 user.model.ts
│        ├── 📄 water-quality.model.ts
│      └── 📂 services/
│        ├── 📄 api.service.ts
│        ├── 📄 auth.service.ts
│        ├── 📄 box.service.ts
│        ├── 📄 complaint.service.ts
│        ├── 📄 distribution.service.ts
│        ├── 📄 inventory.service.ts
│        ├── 📄 notification.service.ts
│        ├── 📄 organization.service.ts
│        ├── 📄 payment.service.ts
│        ├── 📄 storage.service.ts
│        ├── 📄 water-quality.service.ts
│      └── 📂 utils/
│        ├── 📄 constants.ts
│    └── 📂 layouts/
│      └── 📂 admin/
│        ├── 📄 admin.component.css
│        ├── 📄 admin.component.html
│        ├── 📄 admin.component.ts
│      └── 📂 auth/
│        ├── 📄 auth.component.css
│        ├── 📄 auth.component.html
│        ├── 📄 auth.component.ts
│      └── 📂 client/
│        ├── 📄 client.component.css
│        ├── 📄 client.component.html
│        ├── 📄 client.component.ts
│      └── 📂 public/
│        ├── 📄 public.component.css
│        ├── 📄 public.component.html
│        ├── 📄 public.component.ts
│      └── 📂 super-admin/
│        ├── 📄 super-admin.component.css
│        ├── 📄 super-admin.component.html
│        ├── 📄 super-admin.component.ts
│    └── 📂 modules/
│      └── 📂 clients/
│        ├── 📄 clients-routing.module.ts
│        ├── 📄 clients.module.ts
│        └── 📂 components/
│          └── 📂 client-detail/
│            ├── 📄 client-detail.component.css
│            ├── 📄 client-detail.component.html
│            ├── 📄 client-detail.component.ts
│          └── 📂 client-form/
│            ├── 📄 client-form.component.css
│            ├── 📄 client-form.component.html
│            ├── 📄 client-form.component.ts
│          └── 📂 client-list/
│            ├── 📄 client-list.component.css
│            ├── 📄 client-list.component.html
│            ├── 📄 client-list.component.ts
│      └── 📂 complaints/
│        ├── 📄 complaints-routing.module.ts
│        ├── 📄 complaints.module.ts
│        └── 📂 components/
│          └── 📂 complaint-form/
│            ├── 📄 complaint-form.component.css
│            ├── 📄 complaint-form.component.html
│            ├── 📄 complaint-form.component.ts
│          └── 📂 complaint-list/
│            ├── 📄 complaint-list.component.css
│            ├── 📄 complaint-list.component.html
│            ├── 📄 complaint-list.component.ts
│          └── 📂 incident-tracker/
│            ├── 📄 incident-tracker.component.css
│            ├── 📄 incident-tracker.component.html
│            ├── 📄 incident-tracker.component.ts
│      └── 📂 distribution/
│        └── 📂 components/
│          └── 📂 incident-list/
│            ├── 📄 incident-list.component.css
│            ├── 📄 incident-list.component.html
│            ├── 📄 incident-list.component.ts
│          └── 📂 schedule-form/
│            ├── 📄 schedule-form.component.css
│            ├── 📄 schedule-form.component.html
│            ├── 📄 schedule-form.component.ts
│          └── 📂 schedule-list/
│            ├── 📄 schedule-list.component.css
│            ├── 📄 schedule-list.component.html
│            ├── 📄 schedule-list.component.ts
│        ├── 📄 distribution-routing.module.ts
│        ├── 📄 distribution.module.ts
│      └── 📂 infrastructure/
│        └── 📂 components/
│          └── 📂 box-assignment/
│            ├── 📄 box-assignment.component.css
│            ├── 📄 box-assignment.component.html
│            ├── 📄 box-assignment.component.ts
│          └── 📂 box-form/
│            ├── 📄 box-form.component.css
│            ├── 📄 box-form.component.html
│            ├── 📄 box-form.component.ts
│          └── 📂 box-list/
│            ├── 📄 box-list.component.css
│            ├── 📄 box-list.component.html
│            ├── 📄 box-list.component.ts
│        ├── 📄 infrastructure-routing.module.ts
│        ├── 📄 infrastructure.module.ts
│      └── 📂 inventory/
│        └── 📂 components/
│          └── 📂 product-form/
│            ├── 📄 product-form.component.css
│            ├── 📄 product-form.component.html
│            ├── 📄 product-form.component.ts
│          └── 📂 product-list/
│            ├── 📄 product-list.component.css
│            ├── 📄 product-list.component.html
│            ├── 📄 product-list.component.ts
│          └── 📂 purchase-list/
│            ├── 📄 purchase-list.component.css
│            ├── 📄 purchase-list.component.html
│            ├── 📄 purchase-list.component.ts
│        ├── 📄 inventory-routing.module.ts
│        ├── 📄 inventory.module.ts
│      └── 📂 notifications/
│        └── 📂 components/
│          └── 📂 notification-list/
│            ├── 📄 notification-list.component.css
│            ├── 📄 notification-list.component.html
│            ├── 📄 notification-list.component.ts
│          └── 📂 notification-sender/
│            ├── 📄 notification-sender.component.css
│            ├── 📄 notification-sender.component.html
│            ├── 📄 notification-sender.component.ts
│          └── 📂 template-manager/
│            ├── 📄 template-manager.component.css
│            ├── 📄 template-manager.component.html
│            ├── 📄 template-manager.component.ts
│        ├── 📄 notifications-routing.module.ts
│        ├── 📄 notifications.module.ts
│      └── 📂 organizations/
│        └── 📂 components/
│          └── 📂 organization-detail/
│            ├── 📄 organization-detail.component.css
│            ├── 📄 organization-detail.component.html
│            ├── 📄 organization-detail.component.ts
│          └── 📂 organization-form/
│            ├── 📄 organization-form.component.css
│            ├── 📄 organization-form.component.html
│            ├── 📄 organization-form.component.ts
│          └── 📂 organization-list/
│            ├── 📄 organization-list.component.css
│            ├── 📄 organization-list.component.html
│            ├── 📄 organization-list.component.ts
│        ├── 📄 organizations-routing.module.ts
│        ├── 📄 organizations.module.ts
│      └── 📂 payments/
│        └── 📂 components/
│          └── 📂 invoice-list/
│            ├── 📄 invoice-list.component.css
│            ├── 📄 invoice-list.component.html
│            ├── 📄 invoice-list.component.ts
│          └── 📂 payment-form/
│            ├── 📄 payment-form.component.css
│            ├── 📄 payment-form.component.html
│            ├── 📄 payment-form.component.ts
│          └── 📂 payment-list/
│            ├── 📄 payment-list.component.css
│            ├── 📄 payment-list.component.html
│            ├── 📄 payment-list.component.ts
│          └── 📂 receipt-generator/
│            ├── 📄 receipt-generator.component.css
│            ├── 📄 receipt-generator.component.html
│            ├── 📄 receipt-generator.component.ts
│        ├── 📄 payments-routing.module.ts
│        ├── 📄 payments.module.ts
│      └── 📂 users/
│        └── 📂 components/
│          └── 📂 user-form/
│            ├── 📄 user-form.component.css
│            ├── 📄 user-form.component.html
│            ├── 📄 user-form.component.ts
│          └── 📂 user-list/
│            ├── 📄 user-list.component.css
│            ├── 📄 user-list.component.html
│            ├── 📄 user-list.component.ts
│          └── 📂 user-profile/
│            ├── 📄 user-profile.component.css
│            ├── 📄 user-profile.component.html
│            ├── 📄 user-profile.component.ts
│        ├── 📄 users-routing.module.ts
│        ├── 📄 users.module.ts
│      └── 📂 water-quality/
│        └── 📂 components/
│          └── 📂 analysis-list/
│            ├── 📄 analysis-list.component.css
│            ├── 📄 analysis-list.component.html
│            ├── 📄 analysis-list.component.ts
│          └── 📂 chlorine-control/
│            ├── 📄 chlorine-control.component.css
│            ├── 📄 chlorine-control.component.html
│            ├── 📄 chlorine-control.component.ts
│          └── 📂 quality-records/
│            ├── 📄 quality-records.component.css
│            ├── 📄 quality-records.component.html
│            ├── 📄 quality-records.component.ts
│        ├── 📄 water-quality-routing.module.ts
│        ├── 📄 water-quality.module.ts
│    └── 📂 shared/
│      └── 📂 components/
│        └── 📂 layout/
│          └── 📂 breadcrumb/
│            ├── 📄 breadcrumb.component.css
│            ├── 📄 breadcrumb.component.html
│            ├── 📄 breadcrumb.component.ts
│          └── 📂 footer/
│            ├── 📄 footer.component.css
│            ├── 📄 footer.component.html
│            ├── 📄 footer.component.ts
│          └── 📂 header/
│            ├── 📄 header.component.css
│            ├── 📄 header.component.html
│            ├── 📄 header.component.ts
│          └── 📂 sidebar/
│            ├── 📄 sidebar.component.css
│            ├── 📄 sidebar.component.html
│            ├── 📄 sidebar.component.ts
│        └── 📂 ui/
│          └── 📂 buttons/
│          └── 📂 cards/
│            └── 📂 stats-card/
│              ├── 📄 stats-card.component.css
│              ├── 📄 stats-card.component.html
│              ├── 📄 stats-card.component.ts
│          └── 📂 dialogs/
│          └── 📂 forms/
│          └── 📂 loaders/
│          └── 📂 tables/
│            └── 📂 data-table/
│              ├── 📄 data-table.component.css
│              ├── 📄 data-table.component.html
│              ├── 📄 data-table.component.ts
│      └── 📂 directives/
│        ├── 📄 highlight.directive.ts
│        ├── 📄 permission.directive.ts
│        ├── 📄 tooltip.directive.ts
│      └── 📂 pipes/
│        ├── 📄 filter.pipe.ts
│    └── 📂 views/
│      └── 📂 admin/
│        └── 📂 dashboard/
│          ├── 📄 dashboard.component.css
│          ├── 📄 dashboard.component.html
│          ├── 📄 dashboard.component.ts
│        └── 📂 reports/
│          ├── 📄 reports.component.css
│          ├── 📄 reports.component.html
│          ├── 📄 reports.component.ts
│      └── 📂 auth/
│        └── 📂 forgot-password/
│          ├── 📄 forgot-password.component.css
│          ├── 📄 forgot-password.component.html
│          ├── 📄 forgot-password.component.ts
│        └── 📂 login/
│          ├── 📄 login.component.css
│          ├── 📄 login.component.html
│          ├── 📄 login.component.ts
│        └── 📂 register/
│          ├── 📄 register.component.css
│          ├── 📄 register.component.html
│          ├── 📄 register.component.ts
│      └── 📂 client/
│        └── 📂 dashboard/
│          ├── 📄 dashboard.component.css
│          ├── 📄 dashboard.component.html
│          ├── 📄 dashboard.component.ts
│        └── 📂 my-account/
│          ├── 📄 my-account.component.css
│          ├── 📄 my-account.component.html
│          ├── 📄 my-account.component.ts
│        └── 📂 my-payments/
│          ├── 📄 my-payments.component.css
│          ├── 📄 my-payments.component.html
│          ├── 📄 my-payments.component.ts
│      └── 📂 public/
│        └── 📂 about/
│          ├── 📄 about.component.css
│          ├── 📄 about.component.html
│          ├── 📄 about.component.ts
│        └── 📂 contact/
│          ├── 📄 contact.component.css
│          ├── 📄 contact.component.html
│          ├── 📄 contact.component.ts
│        └── 📂 home/
│          ├── 📄 home.component.css
│          ├── 📄 home.component.html
│          ├── 📄 home.component.ts
│      └── 📂 super-admin/
│        └── 📂 dashboard/
│          ├── 📄 dashboard.component.css
│          ├── 📄 dashboard.component.html
│          ├── 📄 dashboard.component.ts
│        └── 📂 organizations/
│          ├── 📄 organizations.component.css
│          ├── 📄 organizations.component.html
│          ├── 📄 organizations.component.ts
│        └── 📂 system-settings/
│          ├── 📄 system-settings.component.css
│          ├── 📄 system-settings.component.html
│          ├── 📄 system-settings.component.ts
│  └── 📂 assets/
│    └── 📂 icons/
│      ├── 📄 logovg.jpg
│      └── 📂 svg/
│    └── 📂 images/
│      ├── 📄 Logo.jpg
│      └── 📂 backgrounds/
│    └── 📂 styles/
│      ├── 📄 mixins.scss
│      ├── 📄 themes.scss
│      ├── 📄 variables.scss
│  └── 📂 environments/
│    ├── 📄 environment.production.ts
│    ├── 📄 environment.ts
│  ├── 📄 index.html
│  ├── 📄 main.ts
│  ├── 📄 styles.css
├── 📄 tsconfig.app.json
├── 📄 tsconfig.json
└── 📄 tsconfig.spec.json
```

## 🧑‍🏫 Contributing (Imperatives & Advice)
- **Fork** this repo.  
- **Create** a feature branch:  
  `git checkout -b feature/water-quality`  
- **Implement**, **test**, and **lint** your feature locally.  
- **Open** a Pull Request with a clear summary and description.  
  > You **should** add “Fixes #\<issue-number\>” in your PR if it's related to an open issue.
  

## 🚀 Deployment Requirements (Must & Need To)
- You **must** set the environment variables:
- ApiUrl-Microservice=[your_mongodb_uri](http://localhost:8080/api/v2/chlorinerecords)
- Credentials = Credentials with admin role
- - You **need to** enable CORS in the Spring configuration for frontend access.  
- You **must** switch to water function/quality

## 💡 Best Practices & Tips
- You **should**  write in the documentation the changes that apply to the Angular frontend.
- You **should** document any new REST endpoints in the README or API specification.  
- You **should** run `npm install ` and `ng serve` to run the system.

- 
## 📞 Questions & Support
If you need help:
- **Open** an issue in this repository.  
- **Tag** `@ronaldinho.ccencho@vallegrande.edu.pe` for urgent issues.  
- **Join** our group chat on Discord or Lindkedin for real-time collaboration.

---

**Thank you for your contributions!**  
👍 *Let's build something meaningful together.*




