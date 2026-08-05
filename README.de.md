# AvalynxLightbox

[![npm version](https://jbs-newmedia.de/badge/npm/avalynx-lightbox/version.svg)](https://www.npmjs.com/package/avalynx-lightbox)
[![npm downloads](https://jbs-newmedia.de/badge/npm/avalynx-lightbox/download.svg)](https://www.npmjs.com/package/avalynx-lightbox)
[![jsDelivr](https://jbs-newmedia.de/badge/jsdelivr/avalynx-lightbox/hits.svg)](https://www.jsdelivr.com/package/npm/avalynx-lightbox)
[![License](https://jbs-newmedia.de/badge/npm/avalynx-lightbox/license.svg)](LICENSE)
[![Tests](https://jbs-newmedia.de/badge/github/avalynx/avalynx-lightbox/tests.svg)](https://github.com/avalynx/avalynx-lightbox/actions/workflows/tests.yml)
[![codecov](https://jbs-newmedia.de/badge/codecov/avalynx/avalynx-lightbox/coverage.svg)](https://codecov.io/gh/avalynx/avalynx-lightbox)
[![GitHub stars](https://jbs-newmedia.de/badge/github/avalynx/avalynx-lightbox/stars.svg)](https://github.com/avalynx/avalynx-lightbox)

AvalynxLightbox ist eine einfache, leichtgewichtige und benutzerfreundliche Lightbox-Bibliothek, die auf Bootstrap 5.3+ basiert und keine weiteren Framework-Abhängigkeiten benötigt. Sie ermöglicht die Anzeige von Bildern in einem Lightbox-Format mit anpassbaren Optionen, ideal für die Integration in moderne Webanwendungen.

## Funktionen

- **Bootstrap-Integration**: Entwickelt für die nahtlose Integration mit Bootstrap >= 5.3.
- **Anpassbare Optionen**: Konfiguriere das Verhalten der Lightbox, einschließlich Schließfunktion, Deckkraft, Z-Index und mehr.
- **Galerie-Modus**: Ermöglicht das Navigieren durch mehrere Bilder mit Navigationsschaltflächen oder Pfeiltasten.
- **Hintergrund-Scrollen verhindern**: Verhindert optional das Scrollen der Hintergrundseite, während die Lightbox geöffnet ist, ohne Inhaltsverschiebung.
- **Schließbare Lightbox**: Ermöglicht es Benutzern optional, die Lightbox über eine Schaltfläche oder durch Klicken außerhalb des Bildes zu schließen.
- **Callback-Unterstützung**: Lege benutzerdefinierte Aktionen fest, wenn die Lightbox geschlossen wird.
- **Leichtgewichtig**: Keine zusätzlichen Abhängigkeiten außer Bootstrap 5.3+.

## Beispiele

Hier ist ein einfaches Beispiel für die Verwendung von AvalynxLightbox in Ihrem Projekt:

* [Übersicht](https://avalynx-lightbox.jbs-newmedia.de/examples/index.html)
* [Lightbox anzeigen](https://avalynx-lightbox.jbs-newmedia.de/examples/show-lightbox.html)
* [Galerie-Modus](https://avalynx-lightbox.jbs-newmedia.de/examples/gallery.html)
* [Kein Hintergrund-Scrollen](https://avalynx-lightbox.jbs-newmedia.de/examples/no-scroll.html)

## Installation

Um AvalynxLightbox in Ihrem Projekt zu verwenden, können Sie es direkt in Ihre HTML-Datei einbinden. Stellen Sie sicher, dass Bootstrap 5.3 oder höher in Ihrem Projekt enthalten ist, damit AvalynxLightbox korrekt funktioniert.

Zuerst Bootstrap einbinden:

```html
<!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3/dist/js/bootstrap.bundle.min.js"></script>
```

Dann AvalynxLightbox einbinden:

```html
<link rel="stylesheet" href="pfad/zu/avalynx-lightbox.css">
<script src="pfad/zu/avalynx-lightbox.js"></script>
```

Ersetzen Sie `pfad/zu/avalynx-lightbox.*` durch den tatsächlichen Pfad zu den Dateien in Ihrem Projekt.

## Installation via jsDelivr ([Link](https://cdn.jsdelivr.net/npm/avalynx-lightbox/))

AvalynxLightbox ist auch über [jsDelivr](https://www.jsdelivr.com/) verfügbar. Sie können es wie folgt in Ihr Projekt einbinden:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/avalynx-lightbox@1.0.6/dist/css/avalynx-lightbox.css">
<script src="https://cdn.jsdelivr.net/npm/avalynx-lightbox@1.0.6/dist/js/avalynx-lightbox.js"></script>
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.


## Installation via NPM ([Link](https://www.npmjs.com/package/avalynx-lightbox))

AvalynxLightbox ist auch als NPM-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
npm install avalynx-lightbox
```

Nach der Installation können Sie AvalynxLightbox wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
import 'avalynx-lightbox/dist/css/avalynx-lightbox.css';
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Installation via Symfony AssetMapper

```bash
php bin/console importmap:require avalynx-lightbox
```

Nach der Installation können Sie AvalynxLightbox wie folgt in Ihre JavaScript-Datei importieren:

```javascript
import { AvalynxLightbox } from 'avalynx-lightbox';
import 'avalynx-lightbox/dist/css/avalynx-lightbox.css';
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Installation via Symfony AssetComposer

Weitere Informationen zum Symfony AssetComposer Bundle finden Sie [hier](https://github.com/jbsnewmedia/asset-composer-bundle).

```twig
{% do addAssetComposer('avalynx/avalynx-lightbox/dist/css/avalynx-lightbox.css') %}
{% do addAssetComposer('avalynx/avalynx-lightbox/dist/js/avalynx-lightbox.js') %}
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Installation via Composer ([Link](https://packagist.org/packages/avalynx/avalynx-lightbox))

AvalynxLightbox ist auch als Composer-Paket verfügbar. Sie können es mit dem folgenden Befehl zu Ihrem Projekt hinzufügen:

```bash
composer require avalynx/avalynx-lightbox
```

Nach der Installation können Sie AvalynxLightbox wie folgt in Ihre HTML-Datei einbinden:

```html
<link rel="stylesheet" href="vendor/avalynx/avalynx-lightbox/dist/css/avalynx-lightbox.css">
<script src="vendor/avalynx/avalynx-lightbox/dist/js/avalynx-lightbox.js"></script>
```

Stellen Sie sicher, dass Sie auch Bootstrap JS/CSS in Ihr Projekt einbinden, um eine korrekte Anzeige von AvalynxLightbox zu gewährleisten.

## Verwendung

Um eine Lightbox zu erstellen, instanziieren Sie einfach ein neues `AvalynxLightbox`-Objekt mit den gewünschten Optionen:

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

AvalynxLightbox ermöglicht die folgenden Optionen zur Anpassung:

- `selector`: (string) CSS-Selektor für die Bilder, die in der Lightbox angezeigt werden sollen (Standard: `'.avalynx-lightbox'`).
- `options`:
    - `closeable`: (boolean) Erlaubt Benutzern das Schließen der Lightbox (Standard: `true`).
    - `closeOnClickOutside`: (boolean) Schließt die Lightbox, wenn der Benutzer außerhalb des Bildes klickt (Standard: `true`).
    - `onClose`: (function) Eine Callback-Funktion, die ausgeführt wird, wenn die Lightbox geschlossen wird (Standard: `null`).
    - `opacity`: (number) Hintergrund-Deckkraft (0-100) (Standard: `80`).
    - `zIndex`: (number) Der Z-Index für die Lightbox (Standard: `1500`).
    - `gallery`: (boolean) Aktiviert den Galerie-Modus für die ausgewählten Bilder (Standard: `false`).
    - `allowBackgroundScrolling`: (boolean) Erlaubt das Scrollen der Hintergrundseite, während die Lightbox geöffnet ist (Standard: `false`).
- `language`:
    - `closeButtonLabel`: (string) Das aria-label für die Schließen-Schaltfläche (Standard: `'Schließen'`).
    - `prevButtonLabel`: (string) Das aria-label für die Zurück-Schaltfläche (Standard: `'Zurück'`).
    - `nextButtonLabel`: (string) Das aria-label für die Weiter-Schaltfläche (Standard: `'Weiter'`).

## Beitragen

Beiträge sind willkommen! Wenn Sie etwas beitragen möchten, forken Sie bitte das Repository und senden Sie einen Pull-Request mit Ihren Änderungen oder Verbesserungen. Wir suchen Beiträge in den folgenden Bereichen:

- Fehlerbehebungen (Bug fixes)
- Funktionserweiterungen
- Dokumentationsverbesserungen

Bevor Sie Ihren Pull-Request einreichen, stellen Sie bitte sicher, dass Ihre Änderungen gut dokumentiert sind und dem bestehenden Codestil des Projekts entsprechen.

## Lizenz

AvalynxLightbox ist quelloffene Software, die unter der [MIT-Lizenz](LICENSE) lizenziert ist.

## Kontakt

Wenn Sie Fragen, Funktionswünsche oder Probleme haben, eröffnen Sie bitte ein Issue in unserem [GitHub-Repository](https://github.com/avalynx/avalynx-lightbox/issues) oder reichen Sie einen Pull-Request ein.

Vielen Dank, dass Sie AvalynxLightbox für Ihr Projekt in Betracht ziehen!