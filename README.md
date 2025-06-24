<<<<<<< HEAD
# Sistema JASS - Frontend Angular

![Logo JASS](public/assets/images/Gotita.png)

Sistema integrado para la gestión de Juntas Administradoras de Servicios de Saneamiento (JASS) basado en microservicios.

## 📝 Visión General del Proyecto

Este repositorio contiene el código fuente del frontend para sistemaJass, una aplicación integral diseñada para la gestión de Juntas Administradoras de Servicios de Saneamiento (JASS). La aplicación proporciona una interfaz de usuario robusta y modular, construida con Angular 19 y estilizada con Tailwind CSS 4, permitiendo a los administradores, operadores y clientes interactuar eficientemente con los diversos microservicios del backend.

El objetivo principal es ofrecer una solución escalable y fácil de mantener, que facilite la administración de usuarios, infraestructura, pagos, distribución de agua, inventario, calidad del agua, reclamos y notificaciones.

## 🚀 Tecnologías Utilizadas

- **Angular 19**: Framework de desarrollo para aplicaciones web, proporcionando una estructura robusta y herramientas para construir SPAs (Single Page Applications).
- **TypeScript**: Un superset de JavaScript que añade tipado estático, mejorando la calidad y la mantenibilidad del código.
- **Tailwind CSS 4**: Un framework CSS "utility-first" que permite construir diseños personalizados rápidamente, directamente en el marcado HTML, con clases de utilidad altamente componibles.
- **SCSS (Sass)**: Preprocesador CSS para escribir estilos más potentes y mantenibles con variables, mixins y funciones anidadas.
- **RxJS**: Librería para programación reactiva que facilita el manejo de eventos asíncronos y flujos de datos.

## 📦 Estructura de Microservicios

| Microservicio | Descripción | Entidades Principales |
|---------------|-------------|----------------------|
| **MS-ORGANIZACIONES** | Gestión de múltiples JASS | Organization, Branch, Members |
| **MS-USUARIOS-AUTENTICACION** | Autenticación unificada y gestión de usuarios | User, Role, Permission, Session |
| **MS-INFRAESTRUCTURA** | Administración de cajas y asignaciones | Box, Assignment, Location |
| **MS-PAGOS-FACTURACION** | Procesamiento de pagos y generación de facturas | Payment, Invoice, Receipt, Transaction |
| **MS-DISTRIBUCION-AGUA** | Programación de horarios y gestión de incidencias | Schedule, Distribution, Incident |
| **MS-INVENTARIO-COMPRAS** | Control de productos y compras | Product, Inventory, Purchase, Supplier |
| **MS-CALIDAD-AGUA** | Monitoreo de calidad del agua | WaterAnalysis, ChlorineLevel, QualityRecord |
| **MS-RECLAMOS-INCIDENCIAS** | Gestión de reclamos e incidencias | Complaint, Ticket, Resolution |
| **MS-NOTIFICACIONES** | Sistema de notificaciones multicanal | Notification, Template, Channel |

## 🏗️ Arquitectura del Frontend

El frontend de sistemaJass sigue una arquitectura modular y escalable, adhiriéndose a las mejores prácticas de Angular para garantizar la mantenibilidad y el rendimiento.

### Diseño Responsivo y Estilización

La aplicación está diseñada bajo el principio Mobile-First, utilizando principalmente Tailwind CSS 4 para construir interfaces responsivas y adaptables a cualquier tamaño de pantalla (dispositivos móviles, tablets, escritorios).

- **Tailwind CSS**: Se utiliza para la mayoría de la estilización, aprovechando sus clases de utilidad para el diseño de componentes, espaciado, tipografía, colores y responsividad (sm:, md:, lg:, etc.).

- **CSS Adicional (SCSS)**: Para estilos más complejos, variables de diseño global, mixins reutilizables y temas específicos, se utilizan archivos SCSS ubicados en `src/assets/styles/`.
  - `mixins.scss`: Contiene mixins SCSS reutilizables para patrones de estilo comunes.
  - `themes.scss`: Define las variables para diferentes temas de la aplicación.
  - `variables.scss`: Almacena variables SCSS globales para colores, fuentes, breakpoints, etc.

- **Consistencia Visual**: Se prioriza la consistencia en el diseño y la experiencia de usuario a través de un sistema de diseño basado en componentes reutilizables y las convenciones de Tailwind.

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

## 🔗 Integración con Microservicios Backend

El frontend de sistemaJass se comunica con un conjunto de microservicios backend, cada uno responsable de una funcionalidad específica. La estructura de módulos y servicios del frontend refleja esta división, facilitando una clara separación de responsabilidades y una integración eficiente.

Aquí se detalla cómo los componentes y servicios del frontend se mapean a los microservicios correspondientes:

### 1. MS-ORGANIZACIONES (Multi-JASS)

- **Descripción**: Gestiona la creación, lectura, actualización y eliminación de información sobre las organizaciones JASS. Es clave para el soporte multi-JASS.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/organization.model.ts`: Define la estructura de datos de una organización.
  - `src/app/core/services/organization.service.ts`: Servicio encargado de realizar las llamadas HTTP al microservicio de organizaciones.
  - `src/app/modules/organizations/`: Contiene los componentes (`organization-list`, `organization-detail`, `organization-form`) y la lógica de negocio específica para la gestión de organizaciones.
  - `src/app/views/super-admin/organizations/`: Vistas de alto nivel para super-administradores para gestionar organizaciones.
  - `src/app/core/auth/interceptors/organization.interceptor.ts`: Posiblemente añade cabeceras específicas de la organización a las peticiones.
  - `src/app/core/auth/guards/organization.guard.ts`: Controla el acceso a rutas basadas en la pertenencia a una organización.

### 2. MS-USUARIOS-AUTENTICACION (Unificado)

- **Descripción**: Maneja todo lo relacionado con la autenticación (login, registro, recuperación de contraseña) y la gestión de usuarios y sus roles (administrador, cliente, super-administrador, organización).
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/auth.model.ts`, `src/app/core/models/user.model.ts`: Modelos de autenticación y usuarios.
  - `src/app/core/services/auth.service.ts`: Servicio principal para login, logout, registro y gestión de sesión.
  - `src/app/core/auth/guards/`: `auth.guard.ts` (general), `admin.guard.ts`, `client.guard.ts`, `organization.guard.ts` (protección de rutas basada en roles).
  - `src/app/core/auth/interceptors/auth.interceptor.ts`: Añade tokens de autenticación a las peticiones.
  - `src/app/views/auth/`: Vistas relacionadas con la autenticación (`login`, `register`, `forgot-password`).
  - `src/app/modules/users/`: Contiene los componentes (`user-list`, `user-form`, `user-profile`) y la lógica de negocio específica para la gestión de usuarios.

### 3. MS-INFRAESTRUCTURA

- **Descripción**: Administra la información de las cajas de agua y sus asignaciones a ubicaciones o usuarios.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/box.model.ts`: Define la estructura de datos de una caja de agua.
  - `src/app/core/services/box.service.ts`: Servicio para la gestión de cajas.
  - `src/app/modules/infrastructure/`: Contiene los componentes (`box-list`, `box-form`, `box-assignment`) y la lógica de negocio para la gestión de infraestructura.

### 4. MS-PAGOS-FACTURACION

- **Descripción**: Procesa pagos, genera facturas y recibos, y gestiona transacciones financieras.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/payment.model.ts`: Define la estructura de datos de pagos, facturas y transacciones.
  - `src/app/core/services/payment.service.ts`: Servicio para la gestión de pagos.
  - `src/app/modules/payments/`: Contiene los componentes (`payment-list`, `invoice-list`, `payment-form`, `receipt-generator`) y la lógica de negocio para pagos y facturación.
  - `src/app/views/client/my-payments/`: Vistas para que los clientes puedan ver sus pagos.

### 5. MS-DISTRIBUCION-AGUA

- **Descripción**: Gestiona la programación de horarios de distribución de agua y el registro de incidencias relacionadas.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/distribution.model.ts`: Define la estructura de datos para la distribución y sus incidencias.
  - `src/app/core/services/distribution.service.ts`: Servicio para la gestión de distribución.
  - `src/app/modules/distribution/`: Contiene los componentes (`schedule-list`, `schedule-form`, `incident-list`) y la lógica de negocio para la distribución de agua.

### 6. MS-INVENTARIO-COMPRAS

- **Descripción**: Controla el inventario de productos y gestiona las compras a proveedores.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/inventory.model.ts`: Define la estructura de datos para productos, inventario y compras.
  - `src/app/core/services/inventory.service.ts`: Servicio para la gestión de inventario.
  - `src/app/modules/inventory/`: Contiene los componentes (`product-list`, `product-form`, `purchase-list`) y la lógica de negocio para inventario y compras.

### 7. MS-CALIDAD-AGUA

- **Descripción**: Monitorea y registra los niveles de calidad del agua, incluyendo análisis y control de cloro.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/water-quality.model.ts`: Define la estructura de datos para análisis y registros de calidad del agua.
  - `src/app/core/services/water-quality.service.ts`: Servicio para la gestión de calidad del agua.
  - `src/app/modules/water-quality/`: Contiene los componentes (`analysis-list`, `chlorine-control`, `quality-records`) y la lógica de negocio para la calidad del agua.

### 8. MS-RECLAMOS-INCIDENCIAS

- **Descripción**: Gestiona el ciclo de vida de los reclamos y las incidencias, desde su creación hasta su resolución.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/complaint.model.ts`: Define la estructura de datos para reclamos e incidencias.
  - `src/app/core/services/complaint.service.ts`: Servicio para la gestión de reclamos.
  - `src/app/modules/complaints/`: Contiene los componentes (`complaint-list`, `complaint-form`, `incident-tracker`) y la lógica de negocio para reclamos e incidencias.

### 9. MS-NOTIFICACIONES

- **Descripción**: Proporciona un sistema de notificaciones multicanal para enviar alertas y mensajes a usuarios y administradores.
- **Módulos/Servicios Frontend**:
  - `src/app/core/models/notification.model.ts`: Define la estructura de datos para notificaciones y plantillas.
  - `src/app/core/services/notification.service.ts`: Servicio para la gestión de notificaciones.
  - `src/app/modules/notifications/`: Contiene los componentes (`notification-list`, `notification-sender`, `template-manager`) y la lógica de negocio para notificaciones.


## Servicio Base de API

**`src/app/core/services/api.service.ts`**:  
Actúa como una capa base para todas las llamadas HTTP, encapsulando la lógica común como:

- Configuración de URLs base.
- Manejo de errores genéricos (en conjunto con `error.interceptor.ts`).
- Formato de las peticiones.

Todos los servicios específicos de cada microservicio utilizan este `api.service` para realizar sus operaciones.

---

## ⚙️ Estándares de Codificación y Mejores Prácticas

### Angular

#### Modularidad
Uso extensivo de módulos de características (`src/app/modules/`) con carga perezosa (_lazy-loading_) para mejorar el rendimiento inicial de la aplicación.

#### Componentes

- **Componentes "Smart" (Contenedores)**:  
  Ubicados en `src/app/views/` o en el nivel superior de los módulos de características. Responsables de:
  - Lógica de negocio.
  - Gestión del estado.
  - Comunicación con servicios.

- **Componentes "Dumb" (Presentacionales)**:  
  Ubicados en `src/app/shared/components/ui/` o en carpetas `components/` de cada módulo. Responsables solo de la presentación.  
  - Reciben datos a través de `@Input()`.
  - Emiten eventos mediante `@Output()`.

#### Servicios
Ubicados en `src/app/core/services/`, cada servicio debe tener una única responsabilidad (_Single Responsibility Principle - SRP_), encapsulando lógica de negocio y comunicación con el backend.

#### Guards
`src/app/core/auth/guards/`: Protegen rutas y controlan el acceso según el estado de autenticación y rol del usuario.

#### Interceptors
`src/app/core/auth/interceptors/`: Interceptan peticiones/respuestas HTTP globalmente. Permiten:

- Añadir cabeceras de autenticación.
- Manejar errores globalmente (`error.interceptor.ts`).
- Manipular respuestas.

#### Manejo de Estado
- Uso de RxJS y Observables para flujos de datos asíncronos y reactivos.
- Para estados complejos, considerar `NgRx` o `NGRX Signals`.

#### Rutado
- Rutas principales en `app.routes.ts`.
- Rutas específicas en archivos `*-routing.module.ts` dentro de cada módulo.
- Rutado basado en roles con rutas protegidas.

---

## Estilo (Tailwind CSS y CSS Adicional)

### Utility-First
El estilo principal se logra con clases de utilidad de **Tailwind CSS** directamente en HTML.

### Personalización con SCSS
Para estilos complejos o personalizados:

- Clases adicionales en archivos `.css` o `.scss` de componentes.
- Estilos globales en `src/assets/styles/`.

### Variables y Temas
- Variables SCSS en `src/assets/styles/variables.scss` para colores, fuentes, espaciado, etc.
- Temas personalizados en `src/assets/styles/themes.scss`.

### Diseño Atómico
Construcción de componentes usando utilidades pequeñas de Tailwind que se combinan para formar componentes más complejos.

### Mobile-First
Diseño que prioriza la experiencia móvil usando variantes responsivas de Tailwind.

---

## Manejo de Errores

**`src/app/core/auth/interceptors/error.interceptor.ts`**  
Centraliza el manejo de errores HTTP. Funciones clave:

- Intercepta errores de la API.
- Muestra mensajes al usuario (ej. mediante servicio de notificación o toast).
- Redirige si es necesario (ej. a login si el token expira).

---

## Autenticación y Autorización

- Autenticación: A través de `auth.service.ts` y `auth.interceptor.ts`.
- Autorización: Mediante Guards como `admin.guard.ts`, `client.guard.ts`, `organization.guard.ts`.

La directiva `permission.directive.ts` en `src/app/shared/directives/` permite controlar la visibilidad de elementos de la UI según permisos del usuario.

---

## ⚙️ Configuración del Entorno

- `src/environments/environment.ts`: Configuración para desarrollo.
- `src/environments/environment.production.ts`: Configuración para producción.
- `src/app/core/utils/constants.ts`: Constantes comunes, como códigos de estado o mensajes.

=======
# vg-sistemJass-english
>>>>>>> 11475de8d423aacead69f3c2715c47c96814d342
