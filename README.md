# Echo Music

<div align="center">
  <img src="assets/screenshots/echomusic_logo.png" alt="Echo Music Logo" width="150"/>
  <br />
  
  ![Status](https://img.shields.io/badge/status-development-372add) 
  ![Platform](https://img.shields.io/badge/platform-Android%20|%20iOS-372add) 
  ![Architecture](https://img.shields.io/badge/architecture-Clean_Architecture-372add)
  ![License](https://img.shields.io/badge/license-MIT-372add)

  **Echo Music** is a high-performance, professional-grade mobile audio player built with React Native. Engineered with Clean Architecture principles to ensure scalability and ultra-fluid performance.

  ---

  **Echo Music** es un reproductor de audio móvil de alto rendimiento y grado profesional construido con React Native. Diseñado bajo los principios de Clean Architecture para garantizar escalabilidad y un rendimiento ultra fluido.
</div>

---

## 🖼️ Preview
<div align="center">
  <img src="assets/screenshots/banner.jpg" alt="Echo Music Banner" width="100%"/>
  <br />
  <i>(Gif preview coming soon / Vista previa en GIF próximamente)</i>
</div>

---

## 🚀 Features / Características

### **English**
- **Clean Architecture:** Domain-driven design with strict separation of concerns (Application, Domain, Infrastructure, Presentation).
- **Native Synchronization:** Advanced integration with `react-native-track-player` for precise playback control and dynamic queues.
- **High-Performance UI:** Modern interface with 60fps animations using `React Native Reanimated` and complex gestures.
- **Smart Persistence:** Indexed local media recovery using `expo-sqlite` for instant access to thousands of tracks.

### **Español**
- **Arquitectura Limpia:** Diseño orientado al dominio con separación estricta de capas (Aplicación, Dominio, Infraestructura, Presentación).
- **Sincronización Nativa:** Integración avanzada con `react-native-track-player` para control preciso y colas dinámicas.
- **UI de Alto Rendimiento:** Interfaz moderna con animaciones a 60fps usando `React Native Reanimated` y gestos complejos.
- **Persistencia Inteligente:** Recuperación indexada de medios locales mediante `expo-sqlite` para acceso instantáneo.

---

## 🏗️ Project Structure / Estructura del Proyecto

The project follows a **Clean Architecture** pattern to isolate business logic from external frameworks:

```text
src/
├── application/     # DTOs, interfaces, and application use cases
├── core/            # Config, constants, errors, and theme settings
├── domain/          # Entities, repository interfaces, and value objects
├── infrastructure/  # API, persistence (SQLite), and native service implementations
└── presentation/    # UI components (features, navigation, shared, store/Zustand)
