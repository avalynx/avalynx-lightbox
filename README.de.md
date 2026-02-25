# AvalynxLightbox

[![npm version](https://img.shields.io/npm/v/avalynx-lightbox)](https://www.npmjs.com/package/avalynx-lightbox)
[![npm downloads](https://img.shields.io/npm/dt/avalynx-lightbox)](https://www.npmjs.com/package/avalynx-lightbox)
[![jsDelivr](https://img.shields.io/jsdelivr/npm/hm/avalynx-lightbox)](https://www.jsdelivr.com/package/npm/avalynx-lightbox)
[![License](https://img.shields.io/npm/l/avalynx-lightbox)](LICENSE)
[![Tests](https://github.com/avalynx/avalynx-lightbox/actions/workflows/tests.yml/badge.svg?branch=main)](https://github.com/avalynx/avalynx-lightbox/actions/workflows/tests.yml)
[![codecov](https://codecov.io/gh/avalynx/avalynx-lightbox/branch/main/graph/badge.svg)](https://codecov.io/gh/avalynx/avalynx-lightbox)
[![GitHub stars](https://img.shields.io/github/stars/avalynx/avalynx-lightbox?style=flat&logo=github)](https://github.com/avalynx/avalynx-lightbox)

AvalynxLightbox ist eine einfache, leichtgewichtige und benutzerfreundliche Lightbox-Bibliothek, die auf Bootstrap 5.3+ basiert und keine weiteren Framework-Abhängigkeiten benötigt. Sie ermöglicht die Anzeige von Bildern in einem Lightbox-Format mit anpassbaren Optionen, ideal für die Integration in moderne Webanwendungen.

## Funktionen

- **Bootstrap-Integration**: Entwickelt für die nahtlose Integration mit Bootstrap >= 5.3.
- **Anpassbare Optionen**: Konfiguriere das Verhalten der Lightbox, einschließlich Schließfunktion, Deckkraft, Z-Index und mehr.
- **Schließbare Lightbox**: Ermöglicht es Benutzern optional, die Lightbox über eine Schaltfläche oder durch Klicken außerhalb des Bildes zu schließen.
- **Callback-Unterstützung**: Lege benutzerdefinierte Aktionen fest, wenn die Lightbox geschlossen wird.
- **Leichtgewichtig**: Keine zusätzlichen Abhängigkeiten außer Bootstrap 5.3+.

## Beispiel

Hier ist ein einfaches Beispiel für die Verwendung von AvalynxLightbox in deinem Projekt:

* [Übersicht](https://avalynx-lightbox.jbs-newmedia.de/examples/index.html)
* [Lightbox anzeigen](https://avalynx-lightbox.jbs-newmedia.de/examples/show-lightbox.html)

## Installation

Um AvalynxLightbox in deinem Projekt zu verwenden, kannst du es direkt in deine HTML-Datei einbinden. Stelle sicher, dass Bootstrap 5.3 oder höher in deinem Projekt enthalten ist, damit AvalynxLightbox korrekt funktioniert.

Zuerst Bootstrap einbinden:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Dann AvalynxLightbox einbinden:

```html
<script src="pfad/zu/avalynx-lightbox.js"></script>
```

Ersetze `pfad/zu/avalynx-lightbox.js` durch den tatsächlichen Pfad zu den Dateien in deinem Projekt.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-lightbox/))

AvalynxLightbox ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Du kannst es wie folgt in dein Projekt einbinden:

```html
<script src="https://cdn.jsdelivr.net/npm/avalynx-lightbox@1.0.2/dist/js/avalynx-lightbox.js"></script>
```

Stelle sicher, dass du auch Bootstrap JS/CSS in dein Projekt einbindest, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.


## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-lightbox))

AvalynxLightbox ist auch als NPM-Paket verfügbar. Du kannst es mit dem folgenden Befehl zu deinem Projekt hinzufügen:

```bash
npm install avalynx-lightbox
```

Nach der Installation kannst du AvalynxLightbox wie folgt in deine JavaScript-Datei importieren:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
```

Stelle sicher, dass du auch Bootstrap JS/CSS in dein Projekt einbindest, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-lightbox
```

Nach der Installation kannst du AvalynxLightbox wie folgt in deine JavaScript-Datei importieren:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
```

Stelle sicher, dass du auch Bootstrap JS/CSS in dein Projekt einbindest, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Installation via Symfony AssetComposer

Weitere Informationen zum Symfony AssetComposer Bundle findest du [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-lightbox/dist/js/avalynx-lightbox.js') %}
```

Stelle sicher, dass du auch Bootstrap JS/CSS in dein Projekt einbindest, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-lightbox))

AvalynxLightbox ist auch als Composer-Paket verfügbar. Du kannst es mit dem folgenden Befehl zu deinem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-lightbox
```

Nach der Installation kannst du AvalynxLightbox wie folgt in deine HTML-Datei einbinden:

```html
<script src="vendor/avalynx/avalynx-lightbox/dist/js/avalynx-lightbox.js"></script>
``` 

Stelle sicher, dass du auch Bootstrap JS/CSS in dein Projekt einbindest, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Verwendung

Um eine Lightbox zu erstellen, instanziiere einfach ein neues `AvalynxLightbox`-Objekt mit den gewünschten Optionen:

```javascript
new AvalynxLightbox('.avalynx-lightbox', {
    closeable: true,
    closeOnClickOutside: true,
    opacity: 80,
    zIndex: 1500,
    onClose: () => console.log('Lightbox geschlossen')
}, {
    closeButtonLabel: 'Schließen'
});

```

## Optionen

AvalynxLightbox unterstützt die folgenden Optionen zur Anpassung:

- `selector`: (string) CSS-Selektor für die Bilder, die in der Lightbox angezeigt werden sollen (Standard: `'.avalynx-lightbox'`).
- `options`:
    - `closeable`: (boolean) Erlaubt Benutzern das Schließen der Lightbox (Standard: `true`).
    - `closeOnClickOutside`: (boolean) Schließt die Lightbox, wenn der Benutzer außerhalb des Bildes klickt (Standard: `true`).
    - `onClose`: (function) Eine Callback-Funktion, die ausgeführt wird, wenn die Lightbox geschlossen wird (Standard: `null`).
    - `opacity`: (number) Hintergrund-Deckkraft (0-100) (Standard: `80`).
    - `zIndex`: (number) Der Z-Index für die Lightbox (Standard: `1500`).
- `language`:
    - `closeButtonLabel`: (string) Das aria-label für die Schließen-Schaltfläche (Standard: `'Schließen'`).

## Mitwirken

Beiträge sind willkommen! Wenn du etwas beitragen möchtest, fork bitte das Repository und sende einen Pull Request mit deinen Änderungen oder Verbesserungen. Wir suchen Beiträge in den folgenden Bereichen:

- Fehlerbehebungen (Bug fixes)
- Funktionserweiterungen
- Dokumentationsverbesserungen

Bevor du deinen Pull Request einreichst, stelle bitte sicher, dass deine Änderungen gut dokumentiert sind und dem bestehenden Codestil des Projekts entsprechen.

## Lizenz

AvalynxLightbox ist quelloffene Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn du Fragen, Funktionswünsche oder Probleme hast, öffne bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-lightbox/issues) oder sende einen Pull Request.

Vielen Dank, dass du AvalynxLightbox für dein Projekt in Betracht ziehst!
