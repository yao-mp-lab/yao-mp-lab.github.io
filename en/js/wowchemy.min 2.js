/*! Wowchemy v5.4.0 | https://wowchemy.com/ */
/*! Copyright 2016-present George Cushen (https://georgecushen.com/) */
/*! License: https://github.com/wowchemy/wowchemy-hugo-themes/blob/main/LICENSE.md */

;
(() => {
  // <stdin>
  (() => {
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var isSupported = function isSupported2(node) {
      return node.tagName === "IMG";
    };
    var isNodeList = function isNodeList2(selector) {
      return NodeList.prototype.isPrototypeOf(selector);
    };
    var isNode = function isNode2(selector) {
      return selector && selector.nodeType === 1;
    };
    var isSvg = function isSvg2(image) {
      var source = image.currentSrc || image.src;
      return source.substr(-4).toLowerCase() === ".svg";
    };
    var getImagesFromSelector = function getImagesFromSelector2(selector) {
      try {
        if (Array.isArray(selector)) {
          return selector.filter(isSupported);
        }
        if (isNodeList(selector)) {
          return [].slice.call(selector).filter(isSupported);
        }
        if (isNode(selector)) {
          return [selector].filter(isSupported);
        }
        if (typeof selector === "string") {
          return [].slice.call(document.querySelectorAll(selector)).filter(isSupported);
        }
        return [];
      } catch (err) {
        throw new TypeError("The provided selector is invalid.\nExpects a CSS selector, a Node element, a NodeList or an array.\nSee: https://github.com/francoischalifour/medium-zoom");
      }
    };
    var createOverlay = function createOverlay2(background) {
      var overlay = document.createElement("div");
      overlay.classList.add("medium-zoom-overlay");
      overlay.style.background = background;
      return overlay;
    };
    var cloneTarget = function cloneTarget2(template) {
      var _template$getBounding = template.getBoundingClientRect(), top = _template$getBounding.top, left = _template$getBounding.left, width = _template$getBounding.width, height = _template$getBounding.height;
      var clone = template.cloneNode();
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
      clone.removeAttribute("id");
      clone.style.position = "absolute";
      clone.style.top = top + scrollTop + "px";
      clone.style.left = left + scrollLeft + "px";
      clone.style.width = width + "px";
      clone.style.height = height + "px";
      clone.style.transform = "";
      return clone;
    };
    var createCustomEvent = function createCustomEvent2(type, params) {
      var eventParams = _extends({
        bubbles: false,
        cancelable: false,
        detail: void 0
      }, params);
      if (typeof window.CustomEvent === "function") {
        return new CustomEvent(type, eventParams);
      }
      var customEvent = document.createEvent("CustomEvent");
      customEvent.initCustomEvent(type, eventParams.bubbles, eventParams.cancelable, eventParams.detail);
      return customEvent;
    };
    var mediumZoomEsm = function mediumZoom(selector) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var Promise2 = window.Promise || function Promise3(fn) {
        function noop() {
        }
        fn(noop, noop);
      };
      var _handleClick = function _handleClick2(event) {
        var target = event.target;
        if (target === overlay) {
          close();
          return;
        }
        if (images.indexOf(target) === -1) {
          return;
        }
        toggle({ target });
      };
      var _handleScroll = function _handleScroll2() {
        if (isAnimating || !active.original) {
          return;
        }
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (Math.abs(scrollTop - currentScroll) > zoomOptions.scrollOffset) {
          setTimeout(close, 150);
        }
      };
      var _handleKeyUp = function _handleKeyUp2(event) {
        var key = event.key || event.keyCode;
        if (key === "Escape" || key === "Esc" || key === 27) {
          close();
        }
      };
      var update = function update2() {
        var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        var newOptions = options2;
        if (options2.background) {
          overlay.style.background = options2.background;
        }
        if (options2.container && options2.container instanceof Object) {
          newOptions.container = _extends({}, zoomOptions.container, options2.container);
        }
        if (options2.template) {
          var template = isNode(options2.template) ? options2.template : document.querySelector(options2.template);
          newOptions.template = template;
        }
        zoomOptions = _extends({}, zoomOptions, newOptions);
        images.forEach(function(image) {
          image.dispatchEvent(createCustomEvent("medium-zoom:update", {
            detail: { zoom }
          }));
        });
        return zoom;
      };
      var clone = function clone2() {
        var options2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        return mediumZoomEsm(_extends({}, zoomOptions, options2));
      };
      var attach = function attach2() {
        for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
          selectors[_key] = arguments[_key];
        }
        var newImages = selectors.reduce(function(imagesAccumulator, currentSelector) {
          return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
        }, []);
        newImages.filter(function(newImage) {
          return images.indexOf(newImage) === -1;
        }).forEach(function(newImage) {
          images.push(newImage);
          newImage.classList.add("medium-zoom-image");
        });
        eventListeners.forEach(function(_ref) {
          var type = _ref.type, listener = _ref.listener, options2 = _ref.options;
          newImages.forEach(function(image) {
            image.addEventListener(type, listener, options2);
          });
        });
        return zoom;
      };
      var detach = function detach2() {
        for (var _len2 = arguments.length, selectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          selectors[_key2] = arguments[_key2];
        }
        if (active.zoomed) {
          close();
        }
        var imagesToDetach = selectors.length > 0 ? selectors.reduce(function(imagesAccumulator, currentSelector) {
          return [].concat(imagesAccumulator, getImagesFromSelector(currentSelector));
        }, []) : images;
        imagesToDetach.forEach(function(image) {
          image.classList.remove("medium-zoom-image");
          image.dispatchEvent(createCustomEvent("medium-zoom:detach", {
            detail: { zoom }
          }));
        });
        images = images.filter(function(image) {
          return imagesToDetach.indexOf(image) === -1;
        });
        return zoom;
      };
      var on = function on2(type, listener) {
        var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        images.forEach(function(image) {
          image.addEventListener("medium-zoom:" + type, listener, options2);
        });
        eventListeners.push({ type: "medium-zoom:" + type, listener, options: options2 });
        return zoom;
      };
      var off = function off2(type, listener) {
        var options2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        images.forEach(function(image) {
          image.removeEventListener("medium-zoom:" + type, listener, options2);
        });
        eventListeners = eventListeners.filter(function(eventListener) {
          return !(eventListener.type === "medium-zoom:" + type && eventListener.listener.toString() === listener.toString());
        });
        return zoom;
      };
      var open = function open2() {
        var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref2.target;
        var _animate = function _animate2() {
          var container = {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
          };
          var viewportWidth = void 0;
          var viewportHeight = void 0;
          if (zoomOptions.container) {
            if (zoomOptions.container instanceof Object) {
              container = _extends({}, container, zoomOptions.container);
              viewportWidth = container.width - container.left - container.right - zoomOptions.margin * 2;
              viewportHeight = container.height - container.top - container.bottom - zoomOptions.margin * 2;
            } else {
              var zoomContainer = isNode(zoomOptions.container) ? zoomOptions.container : document.querySelector(zoomOptions.container);
              var _zoomContainer$getBou = zoomContainer.getBoundingClientRect(), _width = _zoomContainer$getBou.width, _height = _zoomContainer$getBou.height, _left = _zoomContainer$getBou.left, _top = _zoomContainer$getBou.top;
              container = _extends({}, container, {
                width: _width,
                height: _height,
                left: _left,
                top: _top
              });
            }
          }
          viewportWidth = viewportWidth || container.width - zoomOptions.margin * 2;
          viewportHeight = viewportHeight || container.height - zoomOptions.margin * 2;
          var zoomTarget = active.zoomedHd || active.original;
          var naturalWidth = isSvg(zoomTarget) ? viewportWidth : zoomTarget.naturalWidth || viewportWidth;
          var naturalHeight = isSvg(zoomTarget) ? viewportHeight : zoomTarget.naturalHeight || viewportHeight;
          var _zoomTarget$getBoundi = zoomTarget.getBoundingClientRect(), top = _zoomTarget$getBoundi.top, left = _zoomTarget$getBoundi.left, width = _zoomTarget$getBoundi.width, height = _zoomTarget$getBoundi.height;
          var scaleX = Math.min(naturalWidth, viewportWidth) / width;
          var scaleY = Math.min(naturalHeight, viewportHeight) / height;
          var scale = Math.min(scaleX, scaleY);
          var translateX = (-left + (viewportWidth - width) / 2 + zoomOptions.margin + container.left) / scale;
          var translateY = (-top + (viewportHeight - height) / 2 + zoomOptions.margin + container.top) / scale;
          var transform = "scale(" + scale + ") translate3d(" + translateX + "px, " + translateY + "px, 0)";
          active.zoomed.style.transform = transform;
          if (active.zoomedHd) {
            active.zoomedHd.style.transform = transform;
          }
        };
        return new Promise2(function(resolve) {
          if (target && images.indexOf(target) === -1) {
            resolve(zoom);
            return;
          }
          var _handleOpenEnd = function _handleOpenEnd2() {
            isAnimating = false;
            active.zoomed.removeEventListener("transitionend", _handleOpenEnd2);
            active.original.dispatchEvent(createCustomEvent("medium-zoom:opened", {
              detail: { zoom }
            }));
            resolve(zoom);
          };
          if (active.zoomed) {
            resolve(zoom);
            return;
          }
          if (target) {
            active.original = target;
          } else if (images.length > 0) {
            var _images = images;
            active.original = _images[0];
          } else {
            resolve(zoom);
            return;
          }
          active.original.dispatchEvent(createCustomEvent("medium-zoom:open", {
            detail: { zoom }
          }));
          scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
          isAnimating = true;
          active.zoomed = cloneTarget(active.original);
          document.body.appendChild(overlay);
          if (zoomOptions.template) {
            var template = isNode(zoomOptions.template) ? zoomOptions.template : document.querySelector(zoomOptions.template);
            active.template = document.createElement("div");
            active.template.appendChild(template.content.cloneNode(true));
            document.body.appendChild(active.template);
          }
          document.body.appendChild(active.zoomed);
          window.requestAnimationFrame(function() {
            document.body.classList.add("medium-zoom--opened");
          });
          active.original.classList.add("medium-zoom-image--hidden");
          active.zoomed.classList.add("medium-zoom-image--opened");
          active.zoomed.addEventListener("click", close);
          active.zoomed.addEventListener("transitionend", _handleOpenEnd);
          if (active.original.getAttribute("data-zoom-src")) {
            active.zoomedHd = active.zoomed.cloneNode();
            active.zoomedHd.removeAttribute("srcset");
            active.zoomedHd.removeAttribute("sizes");
            active.zoomedHd.src = active.zoomed.getAttribute("data-zoom-src");
            active.zoomedHd.onerror = function() {
              clearInterval(getZoomTargetSize);
              console.warn("Unable to reach the zoom image target " + active.zoomedHd.src);
              active.zoomedHd = null;
              _animate();
            };
            var getZoomTargetSize = setInterval(function() {
              if (active.zoomedHd.complete) {
                clearInterval(getZoomTargetSize);
                active.zoomedHd.classList.add("medium-zoom-image--opened");
                active.zoomedHd.addEventListener("click", close);
                document.body.appendChild(active.zoomedHd);
                _animate();
              }
            }, 10);
          } else if (active.original.hasAttribute("srcset")) {
            active.zoomedHd = active.zoomed.cloneNode();
            active.zoomedHd.removeAttribute("sizes");
            active.zoomedHd.removeAttribute("loading");
            var loadEventListener = active.zoomedHd.addEventListener("load", function() {
              active.zoomedHd.removeEventListener("load", loadEventListener);
              active.zoomedHd.classList.add("medium-zoom-image--opened");
              active.zoomedHd.addEventListener("click", close);
              document.body.appendChild(active.zoomedHd);
              _animate();
            });
          } else {
            _animate();
          }
        });
      };
      var close = function close2() {
        return new Promise2(function(resolve) {
          if (isAnimating || !active.original) {
            resolve(zoom);
            return;
          }
          var _handleCloseEnd = function _handleCloseEnd2() {
            active.original.classList.remove("medium-zoom-image--hidden");
            document.body.removeChild(active.zoomed);
            if (active.zoomedHd) {
              document.body.removeChild(active.zoomedHd);
            }
            document.body.removeChild(overlay);
            active.zoomed.classList.remove("medium-zoom-image--opened");
            if (active.template) {
              document.body.removeChild(active.template);
            }
            isAnimating = false;
            active.zoomed.removeEventListener("transitionend", _handleCloseEnd2);
            active.original.dispatchEvent(createCustomEvent("medium-zoom:closed", {
              detail: { zoom }
            }));
            active.original = null;
            active.zoomed = null;
            active.zoomedHd = null;
            active.template = null;
            resolve(zoom);
          };
          isAnimating = true;
          document.body.classList.remove("medium-zoom--opened");
          active.zoomed.style.transform = "";
          if (active.zoomedHd) {
            active.zoomedHd.style.transform = "";
          }
          if (active.template) {
            active.template.style.transition = "opacity 150ms";
            active.template.style.opacity = 0;
          }
          active.original.dispatchEvent(createCustomEvent("medium-zoom:close", {
            detail: { zoom }
          }));
          active.zoomed.addEventListener("transitionend", _handleCloseEnd);
        });
      };
      var toggle = function toggle2() {
        var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, target = _ref3.target;
        if (active.original) {
          return close();
        }
        return open({ target });
      };
      var getOptions = function getOptions2() {
        return zoomOptions;
      };
      var getImages = function getImages2() {
        return images;
      };
      var getZoomedImage = function getZoomedImage2() {
        return active.original;
      };
      var images = [];
      var eventListeners = [];
      var isAnimating = false;
      var scrollTop = 0;
      var zoomOptions = options;
      var active = {
        original: null,
        zoomed: null,
        zoomedHd: null,
        template: null
      };
      if (Object.prototype.toString.call(selector) === "[object Object]") {
        zoomOptions = selector;
      } else if (selector || typeof selector === "string") {
        attach(selector);
      }
      zoomOptions = _extends({
        margin: 0,
        background: "#fff",
        scrollOffset: 40,
        container: null,
        template: null
      }, zoomOptions);
      var overlay = createOverlay(zoomOptions.background);
      document.addEventListener("click", _handleClick);
      document.addEventListener("keyup", _handleKeyUp);
      document.addEventListener("scroll", _handleScroll);
      window.addEventListener("resize", close);
      var zoom = {
        open,
        close,
        toggle,
        update,
        clone,
        attach,
        detach,
        on,
        off,
        getOptions,
        getImages,
        getZoomedImage
      };
      return zoom;
    };
    function styleInject(css2, ref) {
      if (ref === void 0)
        ref = {};
      var insertAt = ref.insertAt;
      if (!css2 || typeof document === "undefined") {
        return;
      }
      var head = document.head || document.getElementsByTagName("head")[0];
      var style = document.createElement("style");
      style.type = "text/css";
      if (insertAt === "top") {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }
      if (style.styleSheet) {
        style.styleSheet.cssText = css2;
      } else {
        style.appendChild(document.createTextNode(css2));
      }
    }
    var css = ".medium-zoom-overlay{position:fixed;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .3s;will-change:opacity}.medium-zoom--opened .medium-zoom-overlay{cursor:pointer;cursor:zoom-out;opacity:1}.medium-zoom-image{cursor:pointer;cursor:zoom-in;transition:transform .3s cubic-bezier(.2,0,.2,1)!important}.medium-zoom-image--hidden{visibility:hidden}.medium-zoom-image--opened{position:relative;cursor:pointer;cursor:zoom-out;will-change:transform}";
    styleInject(css);
    var medium_zoom_esm_default = mediumZoomEsm;
    var codeHighlighting = true;
    var hugoEnvironment = "rsion";
    var searchEnabled = true;
    function fixMermaid(render = false) {
      let mermaids = [];
      [].push.apply(mermaids, document.getElementsByClassName("language-mermaid"));
      for (let i = 0; i < mermaids.length; i++) {
        let mermaidCodeElement = mermaids[i];
        let newElement = document.createElement("div");
        newElement.innerHTML = mermaidCodeElement.innerHTML;
        newElement.classList.add("mermaid");
        if (render) {
          window.mermaid.mermaidAPI.render(`mermaid-${i}`, newElement.textContent, function(svgCode) {
            newElement.innerHTML = svgCode;
          });
        }
        mermaidCodeElement.parentNode.replaceWith(newElement);
      }
      console.debug(`Processed ${mermaids.length} Mermaid code blocks`);
    }
    function scrollParentToChild(parent, child) {
      const parentRect = parent.getBoundingClientRect();
      const parentViewableArea = {
        height: parent.clientHeight,
        width: parent.clientWidth
      };
      const childRect = child.getBoundingClientRect();
      const isChildInView = childRect.top >= parentRect.top && childRect.bottom <= parentRect.top + parentViewableArea.height;
      if (!isChildInView) {
        parent.scrollTop = childRect.top + parent.scrollTop - parentRect.top;
      }
    }
    function fadeIn(element, duration = 600) {
      element.style.display = "";
      element.style.opacity = "0";
      let last = +new Date();
      let tick = function() {
        element.style.opacity = (+element.style.opacity + (new Date() - last) / duration).toString();
        last = +new Date();
        if (+element.style.opacity < 1) {
          window.requestAnimationFrame && requestAnimationFrame(tick) || setTimeout(tick, 16);
        }
      };
      tick();
    }
    var body = document.body;
    function getThemeMode() {
      return parseInt(localStorage.getItem("wcTheme") || 2);
    }
    function canChangeTheme() {
      return Boolean(window.wc.darkLightEnabled);
    }
    function initThemeVariation() {
      if (!canChangeTheme()) {
        console.debug("User theming disabled.");
        return {
          isDarkTheme: window.wc.isSiteThemeDark,
          themeMode: window.wc.isSiteThemeDark ? 1 : 0
        };
      }
      console.debug("User theming enabled.");
      let isDarkTheme;
      let currentThemeMode = getThemeMode();
      console.debug(`User's theme variation: ${currentThemeMode}`);
      switch (currentThemeMode) {
        case 0:
          isDarkTheme = false;
          break;
        case 1:
          isDarkTheme = true;
          break;
        default:
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            isDarkTheme = true;
          } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            isDarkTheme = false;
          } else {
            isDarkTheme = window.wc.isSiteThemeDark;
          }
          break;
      }
      if (isDarkTheme && !body.classList.contains("dark")) {
        console.debug("Applying Wowchemy dark theme");
        document.body.classList.add("dark");
      } else if (!isDarkTheme && body.classList.contains("dark")) {
        console.debug("Applying Wowchemy light theme");
        document.body.classList.remove("dark");
      }
      return {
        isDarkTheme,
        themeMode: currentThemeMode
      };
    }
    function changeThemeModeClick(newMode) {
      if (!canChangeTheme()) {
        console.debug("Cannot change theme - user theming disabled.");
        return;
      }
      let isDarkTheme;
      switch (newMode) {
        case 0:
          localStorage.setItem("wcTheme", "0");
          isDarkTheme = false;
          console.debug("User changed theme variation to Light.");
          break;
        case 1:
          localStorage.setItem("wcTheme", "1");
          isDarkTheme = true;
          console.debug("User changed theme variation to Dark.");
          break;
        default:
          localStorage.setItem("wcTheme", "2");
          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            isDarkTheme = true;
          } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            isDarkTheme = false;
          } else {
            isDarkTheme = window.wc.isSiteThemeDark;
          }
          console.debug("User changed theme variation to Auto.");
          break;
      }
      renderThemeVariation(isDarkTheme, newMode);
    }
    function showActiveTheme(mode) {
      let linkLight2 = document.querySelector(".js-set-theme-light");
      let linkDark2 = document.querySelector(".js-set-theme-dark");
      let linkAuto2 = document.querySelector(".js-set-theme-auto");
      if (linkLight2 === null) {
        return;
      }
      switch (mode) {
        case 0:
          linkLight2.classList.add("dropdown-item-active");
          linkDark2.classList.remove("dropdown-item-active");
          linkAuto2.classList.remove("dropdown-item-active");
          break;
        case 1:
          linkLight2.classList.remove("dropdown-item-active");
          linkDark2.classList.add("dropdown-item-active");
          linkAuto2.classList.remove("dropdown-item-active");
          break;
        default:
          linkLight2.classList.remove("dropdown-item-active");
          linkDark2.classList.remove("dropdown-item-active");
          linkAuto2.classList.add("dropdown-item-active");
          break;
      }
    }
    function renderThemeVariation(isDarkTheme, themeMode = 2, init = false) {
      const codeHlLight = document.querySelector("link[title=hl-light]");
      const codeHlDark = document.querySelector("link[title=hl-dark]");
      const codeHlEnabled = codeHlLight !== null || codeHlDark !== null;
      const diagramEnabled = document.querySelector("script[title=mermaid]") !== null;
      showActiveTheme(themeMode);
      const themeChangeEvent = new CustomEvent("wcThemeChange", { detail: { isDarkTheme: () => isDarkTheme } });
      document.dispatchEvent(themeChangeEvent);
      if (!init) {
        if (isDarkTheme === false && !body.classList.contains("dark") || isDarkTheme === true && body.classList.contains("dark")) {
          return;
        }
      }
      if (isDarkTheme === false) {
        if (!init) {
          Object.assign(document.body.style, { opacity: 0, visibility: "visible" });
          fadeIn(document.body, 600);
        }
        body.classList.remove("dark");
        if (codeHlEnabled) {
          console.debug("Setting HLJS theme to light");
          if (codeHlLight) {
            codeHlLight.disabled = false;
          }
          if (codeHlDark) {
            codeHlDark.disabled = true;
          }
        }
        if (diagramEnabled) {
          console.debug("Initializing Mermaid with light theme");
          if (init) {
            window.mermaid.initialize({ startOnLoad: false, theme: "default", securityLevel: "loose" });
            fixMermaid(true);
          } else {
            location.reload();
          }
        }
      } else if (isDarkTheme === true) {
        if (!init) {
          Object.assign(document.body.style, { opacity: 0, visibility: "visible" });
          fadeIn(document.body, 600);
        }
        body.classList.add("dark");
        if (codeHlEnabled) {
          console.debug("Setting HLJS theme to dark");
          if (codeHlLight) {
            codeHlLight.disabled = true;
          }
          if (codeHlDark) {
            codeHlDark.disabled = false;
          }
        }
        if (diagramEnabled) {
          console.debug("Initializing Mermaid with dark theme");
          if (init) {
            window.mermaid.initialize({ startOnLoad: false, theme: "dark", securityLevel: "loose" });
            fixMermaid(true);
          } else {
            location.reload();
          }
        }
      }
    }
    function onMediaQueryListEvent(event) {
      if (!canChangeTheme()) {
        return;
      }
      const darkModeOn = event.matches;
      console.debug(`OS dark mode preference changed to ${darkModeOn ? "\u{1F312} on" : "\u2600\uFE0F off"}.`);
      let currentThemeVariation = getThemeMode();
      let isDarkTheme;
      if (currentThemeVariation === 2) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          isDarkTheme = true;
        } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          isDarkTheme = false;
        } else {
          isDarkTheme = window.wc.isSiteThemeDark;
        }
        renderThemeVariation(isDarkTheme, currentThemeVariation);
      }
    }
    console.debug(`Environment: ${hugoEnvironment}`);
    function getNavBarHeight() {
      let navbar = document.getElementById("navbar-main");
      let navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
      console.debug("Navbar height: " + navbarHeight);
      return navbarHeight;
    }
    function scrollToAnchor(target, duration = 0) {
      target = typeof target === "undefined" || typeof target === "object" ? decodeURIComponent(window.location.hash) : target;
      if ($(target).length) {
        target = "#" + $.escapeSelector(target.substring(1));
        let elementOffset = Math.ceil($(target).offset().top - getNavBarHeight());
        $("body").addClass("scrolling");
        $("html, body").animate({
          scrollTop: elementOffset
        }, duration, function() {
          $("body").removeClass("scrolling");
        });
      } else {
        console.debug("Cannot scroll to target `#" + target + "`. ID not found!");
      }
    }
    function fixScrollspy() {
      let $body = $("body");
      let data = $body.data("bs.scrollspy");
      if (data) {
        data._config.offset = getNavBarHeight();
        $body.data("bs.scrollspy", data);
        $body.scrollspy("refresh");
      }
    }
    function removeQueryParamsFromUrl() {
      if (window.history.replaceState) {
        let urlWithoutSearchParams = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.hash;
        window.history.replaceState({ path: urlWithoutSearchParams }, "", urlWithoutSearchParams);
      }
    }
    window.addEventListener("hashchange", scrollToAnchor);
    $("#navbar-main li.nav-item a.nav-link, .js-scroll").on("click", function(event) {
      let hash = this.hash;
      if (this.pathname === window.location.pathname && hash && $(hash).length && $(".js-widget-page").length > 0) {
        event.preventDefault();
        let elementOffset = Math.ceil($(hash).offset().top - getNavBarHeight());
        $("html, body").animate({
          scrollTop: elementOffset
        }, 800);
      }
    });
    $(document).on("click", ".navbar-collapse.show", function(e) {
      let targetElement = $(e.target).is("a") ? $(e.target) : $(e.target).parent();
      if (targetElement.is("a") && targetElement.attr("class") != "dropdown-toggle") {
        $(this).collapse("hide");
      }
    });
    function printLatestRelease(selector, repo) {
      if (hugoEnvironment === "production") {
        $.getJSON("https://api.github.com/repos/" + repo + "/tags").done(function(json) {
          let release = json[0];
          $(selector).append(" " + release.name);
        }).fail(function(jqxhr, textStatus, error) {
          let err = textStatus + ", " + error;
          console.log("Request Failed: " + err);
        });
      }
    }
    function toggleSearchDialog() {
      if ($("body").hasClass("searching")) {
        $("[id=search-query]").blur();
        $("body").removeClass("searching compensate-for-scrollbar");
        removeQueryParamsFromUrl();
        $("#fancybox-style-noscroll").remove();
      } else {
        if (!$("#fancybox-style-noscroll").length && document.body.scrollHeight > window.innerHeight) {
          $("head").append('<style id="fancybox-style-noscroll">.compensate-for-scrollbar{margin-right:' + (window.innerWidth - document.documentElement.clientWidth) + "px;}</style>");
          $("body").addClass("compensate-for-scrollbar");
        }
        $("body").addClass("searching");
        $(".search-results").css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 200);
        let algoliaSearchBox = document.querySelector(".ais-SearchBox-input");
        if (algoliaSearchBox) {
          algoliaSearchBox.focus();
        } else {
          $("#search-query").focus();
        }
      }
    }
    function fixHugoOutput() {
      $("#TableOfContents").addClass("nav flex-column");
      $("#TableOfContents li").addClass("nav-item");
      $("#TableOfContents li a").addClass("nav-link");
      $("input[type='checkbox'][disabled]").parents("ul").addClass("task-list");
    }
    function getSiblings(elem) {
      return Array.prototype.filter.call(elem.parentNode.children, function(sibling) {
        return sibling !== elem;
      });
    }
    $(document).ready(function() {
      fixHugoOutput();
      let { isDarkTheme, themeMode } = initThemeVariation();
      renderThemeVariation(isDarkTheme, themeMode, true);
      if (codeHighlighting) {
        hljs.initHighlighting();
      }
      let child = document.querySelector(".docs-links .active");
      let parent = document.querySelector(".docs-links");
      if (child && parent) {
        scrollParentToChild(parent, child);
      }
    });
    $(window).on("load", function() {
      fixScrollspy();
      let isotopeInstances = document.querySelectorAll(".projects-container");
      let isotopeInstancesCount = isotopeInstances.length;
      if (window.location.hash && isotopeInstancesCount === 0) {
        scrollToAnchor(decodeURIComponent(window.location.hash), 0);
      }
      let child = document.querySelector(".docs-toc .nav-link.active");
      let parent = document.querySelector(".docs-toc");
      if (child && parent) {
        scrollParentToChild(parent, child);
      }
      let zoomOptions = {};
      if (document.body.classList.contains("dark")) {
        zoomOptions.background = "rgba(0,0,0,0.9)";
      } else {
        zoomOptions.background = "rgba(255,255,255,0.9)";
      }
      medium_zoom_esm_default("[data-zoomable]", zoomOptions);
      let isotopeCounter = 0;
      isotopeInstances.forEach(function(isotopeInstance, index) {
        console.debug(`Loading Isotope instance ${index}`);
        let iso;
        let isoSection = isotopeInstance.closest("section");
        let layout = "";
        if (isoSection.querySelector(".isotope").classList.contains("js-layout-row")) {
          layout = "fitRows";
        } else {
          layout = "masonry";
        }
        let defaultFilter = isoSection.querySelector(".default-project-filter");
        let filterText = "*";
        if (defaultFilter !== null) {
          filterText = defaultFilter.textContent;
        }
        console.debug(`Default Isotope filter: ${filterText}`);
        imagesLoaded(isotopeInstance, function() {
          iso = new Isotope(isotopeInstance, {
            itemSelector: ".isotope-item",
            layoutMode: layout,
            masonry: {
              gutter: 20
            },
            filter: filterText
          });
          let isoFilterButtons = isoSection.querySelectorAll(".project-filters a");
          isoFilterButtons.forEach((button) => button.addEventListener("click", (e) => {
            e.preventDefault();
            let selector = button.getAttribute("data-filter");
            console.debug(`Updating Isotope filter to ${selector}`);
            iso.arrange({ filter: selector });
            button.classList.remove("active");
            button.classList.add("active");
            let buttonSiblings = getSiblings(button);
            buttonSiblings.forEach((buttonSibling) => {
              buttonSibling.classList.remove("active");
              buttonSibling.classList.remove("all");
            });
          }));
          incrementIsotopeCounter();
        });
      });
      function incrementIsotopeCounter() {
        isotopeCounter++;
        if (isotopeCounter === isotopeInstancesCount) {
          console.debug(`All Portfolio Isotope instances loaded.`);
          if (window.location.hash) {
            scrollToAnchor(decodeURIComponent(window.location.hash), 0);
          }
        }
      }
      let githubReleaseSelector = ".js-github-release";
      if ($(githubReleaseSelector).length > 0) {
        printLatestRelease(githubReleaseSelector, $(githubReleaseSelector).data("repo"));
      }
      document.addEventListener("keyup", (event) => {
        if (event.code === "Escape") {
          const body2 = document.body;
          if (body2.classList.contains("searching")) {
            toggleSearchDialog();
          }
        }
        if (event.key === "/") {
          let focusedElement = document.hasFocus() && document.activeElement !== document.body && document.activeElement !== document.documentElement && document.activeElement || null;
          let isInputFocused = focusedElement instanceof HTMLInputElement || focusedElement instanceof HTMLTextAreaElement;
          if (searchEnabled && !isInputFocused) {
            event.preventDefault();
            toggleSearchDialog();
          }
        }
      });
      if (searchEnabled) {
        $(".js-search").click(function(e) {
          e.preventDefault();
          toggleSearchDialog();
        });
      }
      $('[data-toggle="tooltip"]').tooltip();
    });
    var linkLight = document.querySelector(".js-set-theme-light");
    var linkDark = document.querySelector(".js-set-theme-dark");
    var linkAuto = document.querySelector(".js-set-theme-auto");
    if (linkLight && linkDark && linkAuto) {
      linkLight.addEventListener("click", (event) => {
        event.preventDefault();
        changeThemeModeClick(0);
      });
      linkDark.addEventListener("click", (event) => {
        event.preventDefault();
        changeThemeModeClick(1);
      });
      linkAuto.addEventListener("click", (event) => {
        event.preventDefault();
        changeThemeModeClick(2);
      });
    }
    var darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    darkModeMediaQuery.addEventListener("change", (event) => {
      onMediaQueryListEvent(event);
    });
    $("body").on("mouseenter mouseleave", ".dropdown", function(e) {
      var dropdown = $(e.target).closest(".dropdown");
      var menu = $(".dropdown-menu", dropdown);
      dropdown.addClass("show");
      menu.addClass("show");
      setTimeout(function() {
        dropdown[dropdown.is(":hover") ? "addClass" : "removeClass"]("show");
        menu[dropdown.is(":hover") ? "addClass" : "removeClass"]("show");
      }, 300);
    });
    var resizeTimer;
    $(window).resize(function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fixScrollspy, 200);
    });
  })();
  (() => {
    var content_type = { authors: "Authors", event: "Events", post: "Posts", project: "Projects", publication: "Publications", slides: "Slides" };
    var i18n = { no_results: "No results found", placeholder: "Search...", results: "results found" };
    var search_config = { indexURI: "/index.json", minLength: 1, threshold: 0.3 };
    var fuseOptions = {
      shouldSort: true,
      includeMatches: true,
      tokenize: true,
      threshold: search_config.threshold,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: search_config.minLength,
      keys: [
        { name: "title", weight: 0.99 },
        { name: "summary", weight: 0.6 },
        { name: "authors", weight: 0.5 },
        { name: "content", weight: 0.2 },
        { name: "tags", weight: 0.5 },
        { name: "categories", weight: 0.5 }
      ]
    };
    var summaryLength = 60;
    function getSearchQuery(name) {
      return decodeURIComponent((location.search.split(name + "=")[1] || "").split("&")[0]).replace(/\+/g, " ");
    }
    function updateURL(url) {
      if (history.replaceState) {
        window.history.replaceState({ path: url }, "", url);
      }
    }
    function initSearch(force, fuse) {
      let query = $("#search-query").val();
      if (query.length < 1) {
        $("#search-hits").empty();
        $("#search-common-queries").show();
      }
      if (!force && query.length < fuseOptions.minMatchCharLength)
        return;
      $("#search-hits").empty();
      $("#search-common-queries").hide();
      searchAcademic(query, fuse);
      let newURL = window.location.protocol + "//" + window.location.host + window.location.pathname + "?q=" + encodeURIComponent(query) + window.location.hash;
      updateURL(newURL);
    }
    function searchAcademic(query, fuse) {
      let results = fuse.search(query);
      if (results.length > 0) {
        $("#search-hits").append('<h3 class="mt-0">' + results.length + " " + i18n.results + "</h3>");
        parseResults(query, results);
      } else {
        $("#search-hits").append('<div class="search-no-results">' + i18n.no_results + "</div>");
      }
    }
    function parseResults(query, results) {
      $.each(results, function(key, value) {
        let content_key = value.item.section;
        let content = "";
        let snippet = "";
        let snippetHighlights = [];
        if (["publication", "event"].includes(content_key)) {
          content = value.item.summary;
        } else {
          content = value.item.content;
        }
        if (fuseOptions.tokenize) {
          snippetHighlights.push(query);
        } else {
          $.each(value.matches, function(matchKey, matchValue) {
            if (matchValue.key == "content") {
              let start = matchValue.indices[0][0] - summaryLength > 0 ? matchValue.indices[0][0] - summaryLength : 0;
              let end = matchValue.indices[0][1] + summaryLength < content.length ? matchValue.indices[0][1] + summaryLength : content.length;
              snippet += content.substring(start, end);
              snippetHighlights.push(matchValue.value.substring(matchValue.indices[0][0], matchValue.indices[0][1] - matchValue.indices[0][0] + 1));
            }
          });
        }
        if (snippet.length < 1) {
          snippet += value.item.summary;
        }
        let template = $("#search-hit-fuse-template").html();
        if (content_key in content_type) {
          content_key = content_type[content_key];
        }
        let templateData = {
          key,
          title: value.item.title,
          type: content_key,
          relpermalink: value.item.relpermalink,
          snippet
        };
        let output = render(template, templateData);
        $("#search-hits").append(output);
        $.each(snippetHighlights, function(hlKey, hlValue) {
          $("#summary-" + key).mark(hlValue);
        });
      });
    }
    function render(template, data) {
      let key, find, re;
      for (key in data) {
        find = "\\{\\{\\s*" + key + "\\s*\\}\\}";
        re = new RegExp(find, "g");
        template = template.replace(re, data[key]);
      }
      return template;
    }
    if (typeof Fuse === "function") {
      $.getJSON(search_config.indexURI, function(search_index) {
        let fuse = new Fuse(search_index, fuseOptions);
        let query = getSearchQuery("q");
        if (query) {
          $("body").addClass("searching");
          $(".search-results").css({ opacity: 0, visibility: "visible" }).animate({ opacity: 1 }, 200);
          $("#search-query").val(query);
          $("#search-query").focus();
          initSearch(true, fuse);
        }
        $("#search-query").keyup(function(e) {
          clearTimeout($.data(this, "searchTimer"));
          if (e.keyCode == 13) {
            initSearch(true, fuse);
          } else {
            $(this).data("searchTimer", setTimeout(function() {
              initSearch(false, fuse);
            }, 250));
          }
        });
      });
    }
  })();
})();
/*! medium-zoom 1.0.6 | MIT License | https://github.com/francoischalifour/medium-zoom */
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiKCgpID0+IHtcbiAgLy8gbnMtaHVnbzovdmFyL2ZvbGRlcnMvZGYvcXg1OF9jejk0MnE4YzR4dDlwNTRuNWowMDAwMGduL1QvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS93b3djaGVteS93b3djaGVteS1odWdvLW1vZHVsZXMvd293Y2hlbXkvdjVAdjUuMC4wLTIwMjIwMjE0MjEyMjU0LTcwODA2NDE0NDM3YS9hc3NldHMvanMvX3ZlbmRvci9tZWRpdW0tem9vbS5lc20uanNcbiAgdmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG4gIHZhciBpc1N1cHBvcnRlZCA9IGZ1bmN0aW9uIGlzU3VwcG9ydGVkMihub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUudGFnTmFtZSA9PT0gXCJJTUdcIjtcbiAgfTtcbiAgdmFyIGlzTm9kZUxpc3QgPSBmdW5jdGlvbiBpc05vZGVMaXN0MihzZWxlY3Rvcikge1xuICAgIHJldHVybiBOb2RlTGlzdC5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihzZWxlY3Rvcik7XG4gIH07XG4gIHZhciBpc05vZGUgPSBmdW5jdGlvbiBpc05vZGUyKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yICYmIHNlbGVjdG9yLm5vZGVUeXBlID09PSAxO1xuICB9O1xuICB2YXIgaXNTdmcgPSBmdW5jdGlvbiBpc1N2ZzIoaW1hZ2UpIHtcbiAgICB2YXIgc291cmNlID0gaW1hZ2UuY3VycmVudFNyYyB8fCBpbWFnZS5zcmM7XG4gICAgcmV0dXJuIHNvdXJjZS5zdWJzdHIoLTQpLnRvTG93ZXJDYXNlKCkgPT09IFwiLnN2Z1wiO1xuICB9O1xuICB2YXIgZ2V0SW1hZ2VzRnJvbVNlbGVjdG9yID0gZnVuY3Rpb24gZ2V0SW1hZ2VzRnJvbVNlbGVjdG9yMihzZWxlY3Rvcikge1xuICAgIHRyeSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yLmZpbHRlcihpc1N1cHBvcnRlZCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNOb2RlTGlzdChzZWxlY3RvcikpIHtcbiAgICAgICAgcmV0dXJuIFtdLnNsaWNlLmNhbGwoc2VsZWN0b3IpLmZpbHRlcihpc1N1cHBvcnRlZCk7XG4gICAgICB9XG4gICAgICBpZiAoaXNOb2RlKHNlbGVjdG9yKSkge1xuICAgICAgICByZXR1cm4gW3NlbGVjdG9yXS5maWx0ZXIoaXNTdXBwb3J0ZWQpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuZmlsdGVyKGlzU3VwcG9ydGVkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBbXTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGUgcHJvdmlkZWQgc2VsZWN0b3IgaXMgaW52YWxpZC5cXG5FeHBlY3RzIGEgQ1NTIHNlbGVjdG9yLCBhIE5vZGUgZWxlbWVudCwgYSBOb2RlTGlzdCBvciBhbiBhcnJheS5cXG5TZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mcmFuY29pc2NoYWxpZm91ci9tZWRpdW0tem9vbVwiKTtcbiAgICB9XG4gIH07XG4gIHZhciBjcmVhdGVPdmVybGF5ID0gZnVuY3Rpb24gY3JlYXRlT3ZlcmxheTIoYmFja2dyb3VuZCkge1xuICAgIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1vdmVybGF5XCIpO1xuICAgIG92ZXJsYXkuc3R5bGUuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgcmV0dXJuIG92ZXJsYXk7XG4gIH07XG4gIHZhciBjbG9uZVRhcmdldCA9IGZ1bmN0aW9uIGNsb25lVGFyZ2V0Mih0ZW1wbGF0ZSkge1xuICAgIHZhciBfdGVtcGxhdGUkZ2V0Qm91bmRpbmcgPSB0ZW1wbGF0ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgdG9wID0gX3RlbXBsYXRlJGdldEJvdW5kaW5nLnRvcCwgbGVmdCA9IF90ZW1wbGF0ZSRnZXRCb3VuZGluZy5sZWZ0LCB3aWR0aCA9IF90ZW1wbGF0ZSRnZXRCb3VuZGluZy53aWR0aCwgaGVpZ2h0ID0gX3RlbXBsYXRlJGdldEJvdW5kaW5nLmhlaWdodDtcbiAgICB2YXIgY2xvbmUgPSB0ZW1wbGF0ZS5jbG9uZU5vZGUoKTtcbiAgICB2YXIgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgfHwgMDtcbiAgICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgfHwgMDtcbiAgICBjbG9uZS5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICBjbG9uZS5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBjbG9uZS5zdHlsZS50b3AgPSB0b3AgKyBzY3JvbGxUb3AgKyBcInB4XCI7XG4gICAgY2xvbmUuc3R5bGUubGVmdCA9IGxlZnQgKyBzY3JvbGxMZWZ0ICsgXCJweFwiO1xuICAgIGNsb25lLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gICAgY2xvbmUuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgIGNsb25lLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9O1xuICB2YXIgY3JlYXRlQ3VzdG9tRXZlbnQgPSBmdW5jdGlvbiBjcmVhdGVDdXN0b21FdmVudDIodHlwZSwgcGFyYW1zKSB7XG4gICAgdmFyIGV2ZW50UGFyYW1zID0gX2V4dGVuZHMoe1xuICAgICAgYnViYmxlczogZmFsc2UsXG4gICAgICBjYW5jZWxhYmxlOiBmYWxzZSxcbiAgICAgIGRldGFpbDogdm9pZCAwXG4gICAgfSwgcGFyYW1zKTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5DdXN0b21FdmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KHR5cGUsIGV2ZW50UGFyYW1zKTtcbiAgICB9XG4gICAgdmFyIGN1c3RvbUV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtcbiAgICBjdXN0b21FdmVudC5pbml0Q3VzdG9tRXZlbnQodHlwZSwgZXZlbnRQYXJhbXMuYnViYmxlcywgZXZlbnRQYXJhbXMuY2FuY2VsYWJsZSwgZXZlbnRQYXJhbXMuZGV0YWlsKTtcbiAgICByZXR1cm4gY3VzdG9tRXZlbnQ7XG4gIH07XG4gIHZhciBtZWRpdW1ab29tRXNtID0gZnVuY3Rpb24gbWVkaXVtWm9vbShzZWxlY3Rvcikge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB2b2lkIDAgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgUHJvbWlzZTIgPSB3aW5kb3cuUHJvbWlzZSB8fCBmdW5jdGlvbiBQcm9taXNlMyhmbikge1xuICAgICAgZnVuY3Rpb24gbm9vcCgpIHtcbiAgICAgIH1cbiAgICAgIGZuKG5vb3AsIG5vb3ApO1xuICAgIH07XG4gICAgdmFyIF9oYW5kbGVDbGljayA9IGZ1bmN0aW9uIF9oYW5kbGVDbGljazIoZXZlbnQpIHtcbiAgICAgIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICBpZiAodGFyZ2V0ID09PSBvdmVybGF5KSB7XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpbWFnZXMuaW5kZXhPZih0YXJnZXQpID09PSAtMSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0b2dnbGUoeyB0YXJnZXQgfSk7XG4gICAgfTtcbiAgICB2YXIgX2hhbmRsZVNjcm9sbCA9IGZ1bmN0aW9uIF9oYW5kbGVTY3JvbGwyKCkge1xuICAgICAgaWYgKGlzQW5pbWF0aW5nIHx8ICFhY3RpdmUub3JpZ2luYWwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnRTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuICAgICAgaWYgKE1hdGguYWJzKHNjcm9sbFRvcCAtIGN1cnJlbnRTY3JvbGwpID4gem9vbU9wdGlvbnMuc2Nyb2xsT2Zmc2V0KSB7XG4gICAgICAgIHNldFRpbWVvdXQoY2xvc2UsIDE1MCk7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgX2hhbmRsZUtleVVwID0gZnVuY3Rpb24gX2hhbmRsZUtleVVwMihldmVudCkge1xuICAgICAgdmFyIGtleSA9IGV2ZW50LmtleSB8fCBldmVudC5rZXlDb2RlO1xuICAgICAgaWYgKGtleSA9PT0gXCJFc2NhcGVcIiB8fCBrZXkgPT09IFwiRXNjXCIgfHwga2V5ID09PSAyNykge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZTIoKSB7XG4gICAgICB2YXIgb3B0aW9uczIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgICAgdmFyIG5ld09wdGlvbnMgPSBvcHRpb25zMjtcbiAgICAgIGlmIChvcHRpb25zMi5iYWNrZ3JvdW5kKSB7XG4gICAgICAgIG92ZXJsYXkuc3R5bGUuYmFja2dyb3VuZCA9IG9wdGlvbnMyLmJhY2tncm91bmQ7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uczIuY29udGFpbmVyICYmIG9wdGlvbnMyLmNvbnRhaW5lciBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgICBuZXdPcHRpb25zLmNvbnRhaW5lciA9IF9leHRlbmRzKHt9LCB6b29tT3B0aW9ucy5jb250YWluZXIsIG9wdGlvbnMyLmNvbnRhaW5lcik7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uczIudGVtcGxhdGUpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlID0gaXNOb2RlKG9wdGlvbnMyLnRlbXBsYXRlKSA/IG9wdGlvbnMyLnRlbXBsYXRlIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvcHRpb25zMi50ZW1wbGF0ZSk7XG4gICAgICAgIG5ld09wdGlvbnMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIHpvb21PcHRpb25zID0gX2V4dGVuZHMoe30sIHpvb21PcHRpb25zLCBuZXdPcHRpb25zKTtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIGltYWdlLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ3VzdG9tRXZlbnQoXCJtZWRpdW0tem9vbTp1cGRhdGVcIiwge1xuICAgICAgICAgIGRldGFpbDogeyB6b29tIH1cbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIHZhciBjbG9uZSA9IGZ1bmN0aW9uIGNsb25lMigpIHtcbiAgICAgIHZhciBvcHRpb25zMiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdm9pZCAwID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICByZXR1cm4gbWVkaXVtWm9vbUVzbShfZXh0ZW5kcyh7fSwgem9vbU9wdGlvbnMsIG9wdGlvbnMyKSk7XG4gICAgfTtcbiAgICB2YXIgYXR0YWNoID0gZnVuY3Rpb24gYXR0YWNoMigpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBzZWxlY3RvcnMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgc2VsZWN0b3JzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgdmFyIG5ld0ltYWdlcyA9IHNlbGVjdG9ycy5yZWR1Y2UoZnVuY3Rpb24oaW1hZ2VzQWNjdW11bGF0b3IsIGN1cnJlbnRTZWxlY3Rvcikge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGltYWdlc0FjY3VtdWxhdG9yLCBnZXRJbWFnZXNGcm9tU2VsZWN0b3IoY3VycmVudFNlbGVjdG9yKSk7XG4gICAgICB9LCBbXSk7XG4gICAgICBuZXdJbWFnZXMuZmlsdGVyKGZ1bmN0aW9uKG5ld0ltYWdlKSB7XG4gICAgICAgIHJldHVybiBpbWFnZXMuaW5kZXhPZihuZXdJbWFnZSkgPT09IC0xO1xuICAgICAgfSkuZm9yRWFjaChmdW5jdGlvbihuZXdJbWFnZSkge1xuICAgICAgICBpbWFnZXMucHVzaChuZXdJbWFnZSk7XG4gICAgICAgIG5ld0ltYWdlLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZVwiKTtcbiAgICAgIH0pO1xuICAgICAgZXZlbnRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihfcmVmKSB7XG4gICAgICAgIHZhciB0eXBlID0gX3JlZi50eXBlLCBsaXN0ZW5lciA9IF9yZWYubGlzdGVuZXIsIG9wdGlvbnMyID0gX3JlZi5vcHRpb25zO1xuICAgICAgICBuZXdJbWFnZXMuZm9yRWFjaChmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMyKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB6b29tO1xuICAgIH07XG4gICAgdmFyIGRldGFjaCA9IGZ1bmN0aW9uIGRldGFjaDIoKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIHNlbGVjdG9ycyA9IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIHNlbGVjdG9yc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgfVxuICAgICAgaWYgKGFjdGl2ZS56b29tZWQpIHtcbiAgICAgICAgY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIHZhciBpbWFnZXNUb0RldGFjaCA9IHNlbGVjdG9ycy5sZW5ndGggPiAwID8gc2VsZWN0b3JzLnJlZHVjZShmdW5jdGlvbihpbWFnZXNBY2N1bXVsYXRvciwgY3VycmVudFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoaW1hZ2VzQWNjdW11bGF0b3IsIGdldEltYWdlc0Zyb21TZWxlY3RvcihjdXJyZW50U2VsZWN0b3IpKTtcbiAgICAgIH0sIFtdKSA6IGltYWdlcztcbiAgICAgIGltYWdlc1RvRGV0YWNoLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UpIHtcbiAgICAgICAgaW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlXCIpO1xuICAgICAgICBpbWFnZS5kaXNwYXRjaEV2ZW50KGNyZWF0ZUN1c3RvbUV2ZW50KFwibWVkaXVtLXpvb206ZGV0YWNoXCIsIHtcbiAgICAgICAgICBkZXRhaWw6IHsgem9vbSB9XG4gICAgICAgIH0pKTtcbiAgICAgIH0pO1xuICAgICAgaW1hZ2VzID0gaW1hZ2VzLmZpbHRlcihmdW5jdGlvbihpbWFnZSkge1xuICAgICAgICByZXR1cm4gaW1hZ2VzVG9EZXRhY2guaW5kZXhPZihpbWFnZSkgPT09IC0xO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIHZhciBvbiA9IGZ1bmN0aW9uIG9uMih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIG9wdGlvbnMyID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB2b2lkIDAgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJtZWRpdW0tem9vbTpcIiArIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zMik7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50TGlzdGVuZXJzLnB1c2goeyB0eXBlOiBcIm1lZGl1bS16b29tOlwiICsgdHlwZSwgbGlzdGVuZXIsIG9wdGlvbnM6IG9wdGlvbnMyIH0pO1xuICAgICAgcmV0dXJuIHpvb207XG4gICAgfTtcbiAgICB2YXIgb2ZmID0gZnVuY3Rpb24gb2ZmMih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIG9wdGlvbnMyID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB2b2lkIDAgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICAgIGltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlKSB7XG4gICAgICAgIGltYWdlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZWRpdW0tem9vbTpcIiArIHR5cGUsIGxpc3RlbmVyLCBvcHRpb25zMik7XG4gICAgICB9KTtcbiAgICAgIGV2ZW50TGlzdGVuZXJzID0gZXZlbnRMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgcmV0dXJuICEoZXZlbnRMaXN0ZW5lci50eXBlID09PSBcIm1lZGl1bS16b29tOlwiICsgdHlwZSAmJiBldmVudExpc3RlbmVyLmxpc3RlbmVyLnRvU3RyaW5nKCkgPT09IGxpc3RlbmVyLnRvU3RyaW5nKCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gem9vbTtcbiAgICB9O1xuICAgIHZhciBvcGVuID0gZnVuY3Rpb24gb3BlbjIoKSB7XG4gICAgICB2YXIgX3JlZjIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHZvaWQgMCA/IGFyZ3VtZW50c1swXSA6IHt9LCB0YXJnZXQgPSBfcmVmMi50YXJnZXQ7XG4gICAgICB2YXIgX2FuaW1hdGUgPSBmdW5jdGlvbiBfYW5pbWF0ZTIoKSB7XG4gICAgICAgIHZhciBjb250YWluZXIgPSB7XG4gICAgICAgICAgd2lkdGg6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgcmlnaHQ6IDAsXG4gICAgICAgICAgYm90dG9tOiAwXG4gICAgICAgIH07XG4gICAgICAgIHZhciB2aWV3cG9ydFdpZHRoID0gdm9pZCAwO1xuICAgICAgICB2YXIgdmlld3BvcnRIZWlnaHQgPSB2b2lkIDA7XG4gICAgICAgIGlmICh6b29tT3B0aW9ucy5jb250YWluZXIpIHtcbiAgICAgICAgICBpZiAoem9vbU9wdGlvbnMuY29udGFpbmVyIGluc3RhbmNlb2YgT2JqZWN0KSB7XG4gICAgICAgICAgICBjb250YWluZXIgPSBfZXh0ZW5kcyh7fSwgY29udGFpbmVyLCB6b29tT3B0aW9ucy5jb250YWluZXIpO1xuICAgICAgICAgICAgdmlld3BvcnRXaWR0aCA9IGNvbnRhaW5lci53aWR0aCAtIGNvbnRhaW5lci5sZWZ0IC0gY29udGFpbmVyLnJpZ2h0IC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgICAgIHZpZXdwb3J0SGVpZ2h0ID0gY29udGFpbmVyLmhlaWdodCAtIGNvbnRhaW5lci50b3AgLSBjb250YWluZXIuYm90dG9tIC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHpvb21Db250YWluZXIgPSBpc05vZGUoem9vbU9wdGlvbnMuY29udGFpbmVyKSA/IHpvb21PcHRpb25zLmNvbnRhaW5lciA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioem9vbU9wdGlvbnMuY29udGFpbmVyKTtcbiAgICAgICAgICAgIHZhciBfem9vbUNvbnRhaW5lciRnZXRCb3UgPSB6b29tQ29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBfd2lkdGggPSBfem9vbUNvbnRhaW5lciRnZXRCb3Uud2lkdGgsIF9oZWlnaHQgPSBfem9vbUNvbnRhaW5lciRnZXRCb3UuaGVpZ2h0LCBfbGVmdCA9IF96b29tQ29udGFpbmVyJGdldEJvdS5sZWZ0LCBfdG9wID0gX3pvb21Db250YWluZXIkZ2V0Qm91LnRvcDtcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IF9leHRlbmRzKHt9LCBjb250YWluZXIsIHtcbiAgICAgICAgICAgICAgd2lkdGg6IF93aWR0aCxcbiAgICAgICAgICAgICAgaGVpZ2h0OiBfaGVpZ2h0LFxuICAgICAgICAgICAgICBsZWZ0OiBfbGVmdCxcbiAgICAgICAgICAgICAgdG9wOiBfdG9wXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmlld3BvcnRXaWR0aCA9IHZpZXdwb3J0V2lkdGggfHwgY29udGFpbmVyLndpZHRoIC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgdmlld3BvcnRIZWlnaHQgPSB2aWV3cG9ydEhlaWdodCB8fCBjb250YWluZXIuaGVpZ2h0IC0gem9vbU9wdGlvbnMubWFyZ2luICogMjtcbiAgICAgICAgdmFyIHpvb21UYXJnZXQgPSBhY3RpdmUuem9vbWVkSGQgfHwgYWN0aXZlLm9yaWdpbmFsO1xuICAgICAgICB2YXIgbmF0dXJhbFdpZHRoID0gaXNTdmcoem9vbVRhcmdldCkgPyB2aWV3cG9ydFdpZHRoIDogem9vbVRhcmdldC5uYXR1cmFsV2lkdGggfHwgdmlld3BvcnRXaWR0aDtcbiAgICAgICAgdmFyIG5hdHVyYWxIZWlnaHQgPSBpc1N2Zyh6b29tVGFyZ2V0KSA/IHZpZXdwb3J0SGVpZ2h0IDogem9vbVRhcmdldC5uYXR1cmFsSGVpZ2h0IHx8IHZpZXdwb3J0SGVpZ2h0O1xuICAgICAgICB2YXIgX3pvb21UYXJnZXQkZ2V0Qm91bmRpID0gem9vbVRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSwgdG9wID0gX3pvb21UYXJnZXQkZ2V0Qm91bmRpLnRvcCwgbGVmdCA9IF96b29tVGFyZ2V0JGdldEJvdW5kaS5sZWZ0LCB3aWR0aCA9IF96b29tVGFyZ2V0JGdldEJvdW5kaS53aWR0aCwgaGVpZ2h0ID0gX3pvb21UYXJnZXQkZ2V0Qm91bmRpLmhlaWdodDtcbiAgICAgICAgdmFyIHNjYWxlWCA9IE1hdGgubWluKG5hdHVyYWxXaWR0aCwgdmlld3BvcnRXaWR0aCkgLyB3aWR0aDtcbiAgICAgICAgdmFyIHNjYWxlWSA9IE1hdGgubWluKG5hdHVyYWxIZWlnaHQsIHZpZXdwb3J0SGVpZ2h0KSAvIGhlaWdodDtcbiAgICAgICAgdmFyIHNjYWxlID0gTWF0aC5taW4oc2NhbGVYLCBzY2FsZVkpO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWCA9ICgtbGVmdCArICh2aWV3cG9ydFdpZHRoIC0gd2lkdGgpIC8gMiArIHpvb21PcHRpb25zLm1hcmdpbiArIGNvbnRhaW5lci5sZWZ0KSAvIHNjYWxlO1xuICAgICAgICB2YXIgdHJhbnNsYXRlWSA9ICgtdG9wICsgKHZpZXdwb3J0SGVpZ2h0IC0gaGVpZ2h0KSAvIDIgKyB6b29tT3B0aW9ucy5tYXJnaW4gKyBjb250YWluZXIudG9wKSAvIHNjYWxlO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gXCJzY2FsZShcIiArIHNjYWxlICsgXCIpIHRyYW5zbGF0ZTNkKFwiICsgdHJhbnNsYXRlWCArIFwicHgsIFwiICsgdHJhbnNsYXRlWSArIFwicHgsIDApXCI7XG4gICAgICAgIGFjdGl2ZS56b29tZWQuc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICBpZiAoYWN0aXZlLnpvb21lZEhkKSB7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZEhkLnN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTIoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICBpZiAodGFyZ2V0ICYmIGltYWdlcy5pbmRleE9mKHRhcmdldCkgPT09IC0xKSB7XG4gICAgICAgICAgcmVzb2x2ZSh6b29tKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9oYW5kbGVPcGVuRW5kID0gZnVuY3Rpb24gX2hhbmRsZU9wZW5FbmQyKCkge1xuICAgICAgICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBfaGFuZGxlT3BlbkVuZDIpO1xuICAgICAgICAgIGFjdGl2ZS5vcmlnaW5hbC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUN1c3RvbUV2ZW50KFwibWVkaXVtLXpvb206b3BlbmVkXCIsIHtcbiAgICAgICAgICAgIGRldGFpbDogeyB6b29tIH1cbiAgICAgICAgICB9KSk7XG4gICAgICAgICAgcmVzb2x2ZSh6b29tKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGFjdGl2ZS56b29tZWQpIHtcbiAgICAgICAgICByZXNvbHZlKHpvb20pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgYWN0aXZlLm9yaWdpbmFsID0gdGFyZ2V0O1xuICAgICAgICB9IGVsc2UgaWYgKGltYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgdmFyIF9pbWFnZXMgPSBpbWFnZXM7XG4gICAgICAgICAgYWN0aXZlLm9yaWdpbmFsID0gX2ltYWdlc1swXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHpvb20pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhY3RpdmUub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChjcmVhdGVDdXN0b21FdmVudChcIm1lZGl1bS16b29tOm9wZW5cIiwge1xuICAgICAgICAgIGRldGFpbDogeyB6b29tIH1cbiAgICAgICAgfSkpO1xuICAgICAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCB8fCAwO1xuICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIGFjdGl2ZS56b29tZWQgPSBjbG9uZVRhcmdldChhY3RpdmUub3JpZ2luYWwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpO1xuICAgICAgICBpZiAoem9vbU9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBpc05vZGUoem9vbU9wdGlvbnMudGVtcGxhdGUpID8gem9vbU9wdGlvbnMudGVtcGxhdGUgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHpvb21PcHRpb25zLnRlbXBsYXRlKTtcbiAgICAgICAgICBhY3RpdmUudGVtcGxhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgIGFjdGl2ZS50ZW1wbGF0ZS5hcHBlbmRDaGlsZCh0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhY3RpdmUudGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYWN0aXZlLnpvb21lZCk7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20tLW9wZW5lZFwiKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFjdGl2ZS5vcmlnaW5hbC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLWhpZGRlblwiKTtcbiAgICAgICAgYWN0aXZlLnpvb21lZC5jbGFzc0xpc3QuYWRkKFwibWVkaXVtLXpvb20taW1hZ2UtLW9wZW5lZFwiKTtcbiAgICAgICAgYWN0aXZlLnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2UpO1xuICAgICAgICBhY3RpdmUuem9vbWVkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0cmFuc2l0aW9uZW5kXCIsIF9oYW5kbGVPcGVuRW5kKTtcbiAgICAgICAgaWYgKGFjdGl2ZS5vcmlnaW5hbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXpvb20tc3JjXCIpKSB7XG4gICAgICAgICAgYWN0aXZlLnpvb21lZEhkID0gYWN0aXZlLnpvb21lZC5jbG9uZU5vZGUoKTtcbiAgICAgICAgICBhY3RpdmUuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwic3Jjc2V0XCIpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplc1wiKTtcbiAgICAgICAgICBhY3RpdmUuem9vbWVkSGQuc3JjID0gYWN0aXZlLnpvb21lZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXpvb20tc3JjXCIpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGdldFpvb21UYXJnZXRTaXplKTtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlVuYWJsZSB0byByZWFjaCB0aGUgem9vbSBpbWFnZSB0YXJnZXQgXCIgKyBhY3RpdmUuem9vbWVkSGQuc3JjKTtcbiAgICAgICAgICAgIGFjdGl2ZS56b29tZWRIZCA9IG51bGw7XG4gICAgICAgICAgICBfYW5pbWF0ZSgpO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGdldFpvb21UYXJnZXRTaXplID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoYWN0aXZlLnpvb21lZEhkLmNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZ2V0Wm9vbVRhcmdldFNpemUpO1xuICAgICAgICAgICAgICBhY3RpdmUuem9vbWVkSGQuY2xhc3NMaXN0LmFkZChcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIik7XG4gICAgICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2UpO1xuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFjdGl2ZS56b29tZWRIZCk7XG4gICAgICAgICAgICAgIF9hbmltYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgMTApO1xuICAgICAgICB9IGVsc2UgaWYgKGFjdGl2ZS5vcmlnaW5hbC5oYXNBdHRyaWJ1dGUoXCJzcmNzZXRcIikpIHtcbiAgICAgICAgICBhY3RpdmUuem9vbWVkSGQgPSBhY3RpdmUuem9vbWVkLmNsb25lTm9kZSgpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5yZW1vdmVBdHRyaWJ1dGUoXCJzaXplc1wiKTtcbiAgICAgICAgICBhY3RpdmUuem9vbWVkSGQucmVtb3ZlQXR0cmlidXRlKFwibG9hZGluZ1wiKTtcbiAgICAgICAgICB2YXIgbG9hZEV2ZW50TGlzdGVuZXIgPSBhY3RpdmUuem9vbWVkSGQuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBhY3RpdmUuem9vbWVkSGQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgbG9hZEV2ZW50TGlzdGVuZXIpO1xuICAgICAgICAgICAgYWN0aXZlLnpvb21lZEhkLmNsYXNzTGlzdC5hZGQoXCJtZWRpdW0tem9vbS1pbWFnZS0tb3BlbmVkXCIpO1xuICAgICAgICAgICAgYWN0aXZlLnpvb21lZEhkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbG9zZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGFjdGl2ZS56b29tZWRIZCk7XG4gICAgICAgICAgICBfYW5pbWF0ZSgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9hbmltYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgdmFyIGNsb3NlID0gZnVuY3Rpb24gY2xvc2UyKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlMihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIGlmIChpc0FuaW1hdGluZyB8fCAhYWN0aXZlLm9yaWdpbmFsKSB7XG4gICAgICAgICAgcmVzb2x2ZSh6b29tKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9oYW5kbGVDbG9zZUVuZCA9IGZ1bmN0aW9uIF9oYW5kbGVDbG9zZUVuZDIoKSB7XG4gICAgICAgICAgYWN0aXZlLm9yaWdpbmFsLmNsYXNzTGlzdC5yZW1vdmUoXCJtZWRpdW0tem9vbS1pbWFnZS0taGlkZGVuXCIpO1xuICAgICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYWN0aXZlLnpvb21lZCk7XG4gICAgICAgICAgaWYgKGFjdGl2ZS56b29tZWRIZCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhY3RpdmUuem9vbWVkSGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKG92ZXJsYXkpO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWQuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWRcIik7XG4gICAgICAgICAgaWYgKGFjdGl2ZS50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhY3RpdmUudGVtcGxhdGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIiwgX2hhbmRsZUNsb3NlRW5kMik7XG4gICAgICAgICAgYWN0aXZlLm9yaWdpbmFsLmRpc3BhdGNoRXZlbnQoY3JlYXRlQ3VzdG9tRXZlbnQoXCJtZWRpdW0tem9vbTpjbG9zZWRcIiwge1xuICAgICAgICAgICAgZGV0YWlsOiB7IHpvb20gfVxuICAgICAgICAgIH0pKTtcbiAgICAgICAgICBhY3RpdmUub3JpZ2luYWwgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWQgPSBudWxsO1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZCA9IG51bGw7XG4gICAgICAgICAgYWN0aXZlLnRlbXBsYXRlID0gbnVsbDtcbiAgICAgICAgICByZXNvbHZlKHpvb20pO1xuICAgICAgICB9O1xuICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcIm1lZGl1bS16b29tLS1vcGVuZWRcIik7XG4gICAgICAgIGFjdGl2ZS56b29tZWQuc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgaWYgKGFjdGl2ZS56b29tZWRIZCkge1xuICAgICAgICAgIGFjdGl2ZS56b29tZWRIZC5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3RpdmUudGVtcGxhdGUpIHtcbiAgICAgICAgICBhY3RpdmUudGVtcGxhdGUuc3R5bGUudHJhbnNpdGlvbiA9IFwib3BhY2l0eSAxNTBtc1wiO1xuICAgICAgICAgIGFjdGl2ZS50ZW1wbGF0ZS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBhY3RpdmUub3JpZ2luYWwuZGlzcGF0Y2hFdmVudChjcmVhdGVDdXN0b21FdmVudChcIm1lZGl1bS16b29tOmNsb3NlXCIsIHtcbiAgICAgICAgICBkZXRhaWw6IHsgem9vbSB9XG4gICAgICAgIH0pKTtcbiAgICAgICAgYWN0aXZlLnpvb21lZC5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLCBfaGFuZGxlQ2xvc2VFbmQpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgICB2YXIgdG9nZ2xlID0gZnVuY3Rpb24gdG9nZ2xlMigpIHtcbiAgICAgIHZhciBfcmVmMyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdm9pZCAwID8gYXJndW1lbnRzWzBdIDoge30sIHRhcmdldCA9IF9yZWYzLnRhcmdldDtcbiAgICAgIGlmIChhY3RpdmUub3JpZ2luYWwpIHtcbiAgICAgICAgcmV0dXJuIGNsb3NlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb3Blbih7IHRhcmdldCB9KTtcbiAgICB9O1xuICAgIHZhciBnZXRPcHRpb25zID0gZnVuY3Rpb24gZ2V0T3B0aW9uczIoKSB7XG4gICAgICByZXR1cm4gem9vbU9wdGlvbnM7XG4gICAgfTtcbiAgICB2YXIgZ2V0SW1hZ2VzID0gZnVuY3Rpb24gZ2V0SW1hZ2VzMigpIHtcbiAgICAgIHJldHVybiBpbWFnZXM7XG4gICAgfTtcbiAgICB2YXIgZ2V0Wm9vbWVkSW1hZ2UgPSBmdW5jdGlvbiBnZXRab29tZWRJbWFnZTIoKSB7XG4gICAgICByZXR1cm4gYWN0aXZlLm9yaWdpbmFsO1xuICAgIH07XG4gICAgdmFyIGltYWdlcyA9IFtdO1xuICAgIHZhciBldmVudExpc3RlbmVycyA9IFtdO1xuICAgIHZhciBpc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHZhciBzY3JvbGxUb3AgPSAwO1xuICAgIHZhciB6b29tT3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgdmFyIGFjdGl2ZSA9IHtcbiAgICAgIG9yaWdpbmFsOiBudWxsLFxuICAgICAgem9vbWVkOiBudWxsLFxuICAgICAgem9vbWVkSGQ6IG51bGwsXG4gICAgICB0ZW1wbGF0ZTogbnVsbFxuICAgIH07XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzZWxlY3RvcikgPT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcbiAgICAgIHpvb21PcHRpb25zID0gc2VsZWN0b3I7XG4gICAgfSBlbHNlIGlmIChzZWxlY3RvciB8fCB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGF0dGFjaChzZWxlY3Rvcik7XG4gICAgfVxuICAgIHpvb21PcHRpb25zID0gX2V4dGVuZHMoe1xuICAgICAgbWFyZ2luOiAwLFxuICAgICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG4gICAgICBzY3JvbGxPZmZzZXQ6IDQwLFxuICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgdGVtcGxhdGU6IG51bGxcbiAgICB9LCB6b29tT3B0aW9ucyk7XG4gICAgdmFyIG92ZXJsYXkgPSBjcmVhdGVPdmVybGF5KHpvb21PcHRpb25zLmJhY2tncm91bmQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBfaGFuZGxlQ2xpY2spO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBfaGFuZGxlS2V5VXApO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgX2hhbmRsZVNjcm9sbCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgY2xvc2UpO1xuICAgIHZhciB6b29tID0ge1xuICAgICAgb3BlbixcbiAgICAgIGNsb3NlLFxuICAgICAgdG9nZ2xlLFxuICAgICAgdXBkYXRlLFxuICAgICAgY2xvbmUsXG4gICAgICBhdHRhY2gsXG4gICAgICBkZXRhY2gsXG4gICAgICBvbixcbiAgICAgIG9mZixcbiAgICAgIGdldE9wdGlvbnMsXG4gICAgICBnZXRJbWFnZXMsXG4gICAgICBnZXRab29tZWRJbWFnZVxuICAgIH07XG4gICAgcmV0dXJuIHpvb207XG4gIH07XG4gIGZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzczIsIHJlZikge1xuICAgIGlmIChyZWYgPT09IHZvaWQgMClcbiAgICAgIHJlZiA9IHt9O1xuICAgIHZhciBpbnNlcnRBdCA9IHJlZi5pbnNlcnRBdDtcbiAgICBpZiAoIWNzczIgfHwgdHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XG4gICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICAgIHN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCI7XG4gICAgaWYgKGluc2VydEF0ID09PSBcInRvcFwiKSB7XG4gICAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICAgIGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgICBpZiAoc3R5bGUuc3R5bGVTaGVldCkge1xuICAgICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzMjtcbiAgICB9IGVsc2Uge1xuICAgICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzMikpO1xuICAgIH1cbiAgfVxuICB2YXIgY3NzID0gXCIubWVkaXVtLXpvb20tb3ZlcmxheXtwb3NpdGlvbjpmaXhlZDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IC4zczt3aWxsLWNoYW5nZTpvcGFjaXR5fS5tZWRpdW0tem9vbS0tb3BlbmVkIC5tZWRpdW0tem9vbS1vdmVybGF5e2N1cnNvcjpwb2ludGVyO2N1cnNvcjp6b29tLW91dDtvcGFjaXR5OjF9Lm1lZGl1bS16b29tLWltYWdle2N1cnNvcjpwb2ludGVyO2N1cnNvcjp6b29tLWluO3RyYW5zaXRpb246dHJhbnNmb3JtIC4zcyBjdWJpYy1iZXppZXIoLjIsMCwuMiwxKSFpbXBvcnRhbnR9Lm1lZGl1bS16b29tLWltYWdlLS1oaWRkZW57dmlzaWJpbGl0eTpoaWRkZW59Lm1lZGl1bS16b29tLWltYWdlLS1vcGVuZWR7cG9zaXRpb246cmVsYXRpdmU7Y3Vyc29yOnBvaW50ZXI7Y3Vyc29yOnpvb20tb3V0O3dpbGwtY2hhbmdlOnRyYW5zZm9ybX1cIjtcbiAgc3R5bGVJbmplY3QoY3NzKTtcbiAgdmFyIG1lZGl1bV96b29tX2VzbV9kZWZhdWx0ID0gbWVkaXVtWm9vbUVzbTtcblxuICAvLyBucy1wYXJhbXM6QHBhcmFtc1xuICB2YXIgY29kZUhpZ2hsaWdodGluZyA9IHRydWU7XG4gIHZhciBodWdvRW52aXJvbm1lbnQgPSBcInJzaW9uXCI7XG4gIHZhciBzZWFyY2hFbmFibGVkID0gdHJ1ZTtcblxuICAvLyBucy1odWdvOi92YXIvZm9sZGVycy9kZi9xeDU4X2N6OTQycThjNHh0OXA1NG41ajAwMDAwZ24vVC9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3dvd2NoZW15L3dvd2NoZW15LWh1Z28tbW9kdWxlcy93b3djaGVteS92NUB2NS4wLjAtMjAyMjAyMTQyMTIyNTQtNzA4MDY0MTQ0MzdhL2Fzc2V0cy9qcy93b3djaGVteS11dGlscy5qc1xuICBmdW5jdGlvbiBmaXhNZXJtYWlkKHJlbmRlciA9IGZhbHNlKSB7XG4gICAgbGV0IG1lcm1haWRzID0gW107XG4gICAgW10ucHVzaC5hcHBseShtZXJtYWlkcywgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhbmd1YWdlLW1lcm1haWRcIikpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVybWFpZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBtZXJtYWlkQ29kZUVsZW1lbnQgPSBtZXJtYWlkc1tpXTtcbiAgICAgIGxldCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG5ld0VsZW1lbnQuaW5uZXJIVE1MID0gbWVybWFpZENvZGVFbGVtZW50LmlubmVySFRNTDtcbiAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1lcm1haWRcIik7XG4gICAgICBpZiAocmVuZGVyKSB7XG4gICAgICAgIHdpbmRvdy5tZXJtYWlkLm1lcm1haWRBUEkucmVuZGVyKGBtZXJtYWlkLSR7aX1gLCBuZXdFbGVtZW50LnRleHRDb250ZW50LCBmdW5jdGlvbihzdmdDb2RlKSB7XG4gICAgICAgICAgbmV3RWxlbWVudC5pbm5lckhUTUwgPSBzdmdDb2RlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIG1lcm1haWRDb2RlRWxlbWVudC5wYXJlbnROb2RlLnJlcGxhY2VXaXRoKG5ld0VsZW1lbnQpO1xuICAgIH1cbiAgICBjb25zb2xlLmRlYnVnKGBQcm9jZXNzZWQgJHttZXJtYWlkcy5sZW5ndGh9IE1lcm1haWQgY29kZSBibG9ja3NgKTtcbiAgfVxuICBmdW5jdGlvbiBzY3JvbGxQYXJlbnRUb0NoaWxkKHBhcmVudCwgY2hpbGQpIHtcbiAgICBjb25zdCBwYXJlbnRSZWN0ID0gcGFyZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHBhcmVudFZpZXdhYmxlQXJlYSA9IHtcbiAgICAgIGhlaWdodDogcGFyZW50LmNsaWVudEhlaWdodCxcbiAgICAgIHdpZHRoOiBwYXJlbnQuY2xpZW50V2lkdGhcbiAgICB9O1xuICAgIGNvbnN0IGNoaWxkUmVjdCA9IGNoaWxkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGlzQ2hpbGRJblZpZXcgPSBjaGlsZFJlY3QudG9wID49IHBhcmVudFJlY3QudG9wICYmIGNoaWxkUmVjdC5ib3R0b20gPD0gcGFyZW50UmVjdC50b3AgKyBwYXJlbnRWaWV3YWJsZUFyZWEuaGVpZ2h0O1xuICAgIGlmICghaXNDaGlsZEluVmlldykge1xuICAgICAgcGFyZW50LnNjcm9sbFRvcCA9IGNoaWxkUmVjdC50b3AgKyBwYXJlbnQuc2Nyb2xsVG9wIC0gcGFyZW50UmVjdC50b3A7XG4gICAgfVxuICB9XG5cbiAgLy8gbnMtaHVnbzovdmFyL2ZvbGRlcnMvZGYvcXg1OF9jejk0MnE4YzR4dDlwNTRuNWowMDAwMGduL1QvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS93b3djaGVteS93b3djaGVteS1odWdvLW1vZHVsZXMvd293Y2hlbXkvdjVAdjUuMC4wLTIwMjIwMjE0MjEyMjU0LTcwODA2NDE0NDM3YS9hc3NldHMvanMvd293Y2hlbXktYW5pbWF0aW9uLmpzXG4gIGZ1bmN0aW9uIGZhZGVJbihlbGVtZW50LCBkdXJhdGlvbiA9IDYwMCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XG4gICAgbGV0IGxhc3QgPSArbmV3IERhdGUoKTtcbiAgICBsZXQgdGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgZWxlbWVudC5zdHlsZS5vcGFjaXR5ID0gKCtlbGVtZW50LnN0eWxlLm9wYWNpdHkgKyAobmV3IERhdGUoKSAtIGxhc3QpIC8gZHVyYXRpb24pLnRvU3RyaW5nKCk7XG4gICAgICBsYXN0ID0gK25ldyBEYXRlKCk7XG4gICAgICBpZiAoK2VsZW1lbnQuc3R5bGUub3BhY2l0eSA8IDEpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAmJiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljaykgfHwgc2V0VGltZW91dCh0aWNrLCAxNik7XG4gICAgICB9XG4gICAgfTtcbiAgICB0aWNrKCk7XG4gIH1cblxuICAvLyBucy1odWdvOi92YXIvZm9sZGVycy9kZi9xeDU4X2N6OTQycThjNHh0OXA1NG41ajAwMDAwZ24vVC9odWdvX2NhY2hlL21vZHVsZXMvZmlsZWNhY2hlL21vZHVsZXMvcGtnL21vZC9naXRodWIuY29tL3dvd2NoZW15L3dvd2NoZW15LWh1Z28tbW9kdWxlcy93b3djaGVteS92NUB2NS4wLjAtMjAyMjAyMTQyMTIyNTQtNzA4MDY0MTQ0MzdhL2Fzc2V0cy9qcy93b3djaGVteS10aGVtaW5nLmpzXG4gIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgZnVuY3Rpb24gZ2V0VGhlbWVNb2RlKCkge1xuICAgIHJldHVybiBwYXJzZUludChsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcIndjVGhlbWVcIikgfHwgMik7XG4gIH1cbiAgZnVuY3Rpb24gY2FuQ2hhbmdlVGhlbWUoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4od2luZG93LndjLmRhcmtMaWdodEVuYWJsZWQpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXRUaGVtZVZhcmlhdGlvbigpIHtcbiAgICBpZiAoIWNhbkNoYW5nZVRoZW1lKCkpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJVc2VyIHRoZW1pbmcgZGlzYWJsZWQuXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaXNEYXJrVGhlbWU6IHdpbmRvdy53Yy5pc1NpdGVUaGVtZURhcmssXG4gICAgICAgIHRoZW1lTW9kZTogd2luZG93LndjLmlzU2l0ZVRoZW1lRGFyayA/IDEgOiAwXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zb2xlLmRlYnVnKFwiVXNlciB0aGVtaW5nIGVuYWJsZWQuXCIpO1xuICAgIGxldCBpc0RhcmtUaGVtZTtcbiAgICBsZXQgY3VycmVudFRoZW1lTW9kZSA9IGdldFRoZW1lTW9kZSgpO1xuICAgIGNvbnNvbGUuZGVidWcoYFVzZXIncyB0aGVtZSB2YXJpYXRpb246ICR7Y3VycmVudFRoZW1lTW9kZX1gKTtcbiAgICBzd2l0Y2ggKGN1cnJlbnRUaGVtZU1vZGUpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgaXNEYXJrVGhlbWUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIGlzRGFya1RoZW1lID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICBpc0RhcmtUaGVtZSA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgaXNEYXJrVGhlbWUgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpc0RhcmtUaGVtZSA9IHdpbmRvdy53Yy5pc1NpdGVUaGVtZURhcms7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmIChpc0RhcmtUaGVtZSAmJiAhYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXJrXCIpKSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiQXBwbHlpbmcgV293Y2hlbXkgZGFyayB0aGVtZVwiKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImRhcmtcIik7XG4gICAgfSBlbHNlIGlmICghaXNEYXJrVGhlbWUgJiYgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXJrXCIpKSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiQXBwbHlpbmcgV293Y2hlbXkgbGlnaHQgdGhlbWVcIik7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJkYXJrXCIpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaXNEYXJrVGhlbWUsXG4gICAgICB0aGVtZU1vZGU6IGN1cnJlbnRUaGVtZU1vZGVcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGNoYW5nZVRoZW1lTW9kZUNsaWNrKG5ld01vZGUpIHtcbiAgICBpZiAoIWNhbkNoYW5nZVRoZW1lKCkpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJDYW5ub3QgY2hhbmdlIHRoZW1lIC0gdXNlciB0aGVtaW5nIGRpc2FibGVkLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IGlzRGFya1RoZW1lO1xuICAgIHN3aXRjaCAobmV3TW9kZSkge1xuICAgICAgY2FzZSAwOlxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndjVGhlbWVcIiwgXCIwXCIpO1xuICAgICAgICBpc0RhcmtUaGVtZSA9IGZhbHNlO1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVXNlciBjaGFuZ2VkIHRoZW1lIHZhcmlhdGlvbiB0byBMaWdodC5cIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIndjVGhlbWVcIiwgXCIxXCIpO1xuICAgICAgICBpc0RhcmtUaGVtZSA9IHRydWU7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJVc2VyIGNoYW5nZWQgdGhlbWUgdmFyaWF0aW9uIHRvIERhcmsuXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwid2NUaGVtZVwiLCBcIjJcIik7XG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaylcIikubWF0Y2hlcykge1xuICAgICAgICAgIGlzRGFya1RoZW1lID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpXCIpLm1hdGNoZXMpIHtcbiAgICAgICAgICBpc0RhcmtUaGVtZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlzRGFya1RoZW1lID0gd2luZG93LndjLmlzU2l0ZVRoZW1lRGFyaztcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVXNlciBjaGFuZ2VkIHRoZW1lIHZhcmlhdGlvbiB0byBBdXRvLlwiKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJlbmRlclRoZW1lVmFyaWF0aW9uKGlzRGFya1RoZW1lLCBuZXdNb2RlKTtcbiAgfVxuICBmdW5jdGlvbiBzaG93QWN0aXZlVGhlbWUobW9kZSkge1xuICAgIGxldCBsaW5rTGlnaHQyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1zZXQtdGhlbWUtbGlnaHRcIik7XG4gICAgbGV0IGxpbmtEYXJrMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2V0LXRoZW1lLWRhcmtcIik7XG4gICAgbGV0IGxpbmtBdXRvMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtc2V0LXRoZW1lLWF1dG9cIik7XG4gICAgaWYgKGxpbmtMaWdodDIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGxpbmtMaWdodDIuY2xhc3NMaXN0LmFkZChcImRyb3Bkb3duLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICBsaW5rRGFyazIuY2xhc3NMaXN0LnJlbW92ZShcImRyb3Bkb3duLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICBsaW5rQXV0bzIuY2xhc3NMaXN0LnJlbW92ZShcImRyb3Bkb3duLWl0ZW0tYWN0aXZlXCIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgbGlua0xpZ2h0Mi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxpbmtEYXJrMi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxpbmtBdXRvMi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbGlua0xpZ2h0Mi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxpbmtEYXJrMi5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGxpbmtBdXRvMi5jbGFzc0xpc3QuYWRkKFwiZHJvcGRvd24taXRlbS1hY3RpdmVcIik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiByZW5kZXJUaGVtZVZhcmlhdGlvbihpc0RhcmtUaGVtZSwgdGhlbWVNb2RlID0gMiwgaW5pdCA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29kZUhsTGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibGlua1t0aXRsZT1obC1saWdodF1cIik7XG4gICAgY29uc3QgY29kZUhsRGFyayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsaW5rW3RpdGxlPWhsLWRhcmtdXCIpO1xuICAgIGNvbnN0IGNvZGVIbEVuYWJsZWQgPSBjb2RlSGxMaWdodCAhPT0gbnVsbCB8fCBjb2RlSGxEYXJrICE9PSBudWxsO1xuICAgIGNvbnN0IGRpYWdyYW1FbmFibGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcInNjcmlwdFt0aXRsZT1tZXJtYWlkXVwiKSAhPT0gbnVsbDtcbiAgICBzaG93QWN0aXZlVGhlbWUodGhlbWVNb2RlKTtcbiAgICBjb25zdCB0aGVtZUNoYW5nZUV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFwid2NUaGVtZUNoYW5nZVwiLCB7IGRldGFpbDogeyBpc0RhcmtUaGVtZTogKCkgPT4gaXNEYXJrVGhlbWUgfSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHRoZW1lQ2hhbmdlRXZlbnQpO1xuICAgIGlmICghaW5pdCkge1xuICAgICAgaWYgKGlzRGFya1RoZW1lID09PSBmYWxzZSAmJiAhYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJkYXJrXCIpIHx8IGlzRGFya1RoZW1lID09PSB0cnVlICYmIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGFya1wiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpc0RhcmtUaGVtZSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmICghaW5pdCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKGRvY3VtZW50LmJvZHkuc3R5bGUsIHsgb3BhY2l0eTogMCwgdmlzaWJpbGl0eTogXCJ2aXNpYmxlXCIgfSk7XG4gICAgICAgIGZhZGVJbihkb2N1bWVudC5ib2R5LCA2MDApO1xuICAgICAgfVxuICAgICAgYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiZGFya1wiKTtcbiAgICAgIGlmIChjb2RlSGxFbmFibGVkKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJTZXR0aW5nIEhMSlMgdGhlbWUgdG8gbGlnaHRcIik7XG4gICAgICAgIGlmIChjb2RlSGxMaWdodCkge1xuICAgICAgICAgIGNvZGVIbExpZ2h0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGVIbERhcmspIHtcbiAgICAgICAgICBjb2RlSGxEYXJrLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRpYWdyYW1FbmFibGVkKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJJbml0aWFsaXppbmcgTWVybWFpZCB3aXRoIGxpZ2h0IHRoZW1lXCIpO1xuICAgICAgICBpZiAoaW5pdCkge1xuICAgICAgICAgIHdpbmRvdy5tZXJtYWlkLmluaXRpYWxpemUoeyBzdGFydE9uTG9hZDogZmFsc2UsIHRoZW1lOiBcImRlZmF1bHRcIiwgc2VjdXJpdHlMZXZlbDogXCJsb29zZVwiIH0pO1xuICAgICAgICAgIGZpeE1lcm1haWQodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRGFya1RoZW1lID09PSB0cnVlKSB7XG4gICAgICBpZiAoIWluaXQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihkb2N1bWVudC5ib2R5LnN0eWxlLCB7IG9wYWNpdHk6IDAsIHZpc2liaWxpdHk6IFwidmlzaWJsZVwiIH0pO1xuICAgICAgICBmYWRlSW4oZG9jdW1lbnQuYm9keSwgNjAwKTtcbiAgICAgIH1cbiAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZChcImRhcmtcIik7XG4gICAgICBpZiAoY29kZUhsRW5hYmxlZCkge1xuICAgICAgICBjb25zb2xlLmRlYnVnKFwiU2V0dGluZyBITEpTIHRoZW1lIHRvIGRhcmtcIik7XG4gICAgICAgIGlmIChjb2RlSGxMaWdodCkge1xuICAgICAgICAgIGNvZGVIbExpZ2h0LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29kZUhsRGFyaykge1xuICAgICAgICAgIGNvZGVIbERhcmsuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRpYWdyYW1FbmFibGVkKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJJbml0aWFsaXppbmcgTWVybWFpZCB3aXRoIGRhcmsgdGhlbWVcIik7XG4gICAgICAgIGlmIChpbml0KSB7XG4gICAgICAgICAgd2luZG93Lm1lcm1haWQuaW5pdGlhbGl6ZSh7IHN0YXJ0T25Mb2FkOiBmYWxzZSwgdGhlbWU6IFwiZGFya1wiLCBzZWN1cml0eUxldmVsOiBcImxvb3NlXCIgfSk7XG4gICAgICAgICAgZml4TWVybWFpZCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBvbk1lZGlhUXVlcnlMaXN0RXZlbnQoZXZlbnQpIHtcbiAgICBpZiAoIWNhbkNoYW5nZVRoZW1lKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGFya01vZGVPbiA9IGV2ZW50Lm1hdGNoZXM7XG4gICAgY29uc29sZS5kZWJ1ZyhgT1MgZGFyayBtb2RlIHByZWZlcmVuY2UgY2hhbmdlZCB0byAke2RhcmtNb2RlT24gPyBcIlxcdXsxRjMxMn0gb25cIiA6IFwiXFx1MjYwMFxcdUZFMEYgb2ZmXCJ9LmApO1xuICAgIGxldCBjdXJyZW50VGhlbWVWYXJpYXRpb24gPSBnZXRUaGVtZU1vZGUoKTtcbiAgICBsZXQgaXNEYXJrVGhlbWU7XG4gICAgaWYgKGN1cnJlbnRUaGVtZVZhcmlhdGlvbiA9PT0gMikge1xuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGlzRGFya1RoZW1lID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAod2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KVwiKS5tYXRjaGVzKSB7XG4gICAgICAgIGlzRGFya1RoZW1lID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc0RhcmtUaGVtZSA9IHdpbmRvdy53Yy5pc1NpdGVUaGVtZURhcms7XG4gICAgICB9XG4gICAgICByZW5kZXJUaGVtZVZhcmlhdGlvbihpc0RhcmtUaGVtZSwgY3VycmVudFRoZW1lVmFyaWF0aW9uKTtcbiAgICB9XG4gIH1cblxuICAvLyA8c3RkaW4+XG4gIGNvbnNvbGUuZGVidWcoYEVudmlyb25tZW50OiAke2h1Z29FbnZpcm9ubWVudH1gKTtcbiAgZnVuY3Rpb24gZ2V0TmF2QmFySGVpZ2h0KCkge1xuICAgIGxldCBuYXZiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdmJhci1tYWluXCIpO1xuICAgIGxldCBuYXZiYXJIZWlnaHQgPSBuYXZiYXIgPyBuYXZiYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogMDtcbiAgICBjb25zb2xlLmRlYnVnKFwiTmF2YmFyIGhlaWdodDogXCIgKyBuYXZiYXJIZWlnaHQpO1xuICAgIHJldHVybiBuYXZiYXJIZWlnaHQ7XG4gIH1cbiAgZnVuY3Rpb24gc2Nyb2xsVG9BbmNob3IodGFyZ2V0LCBkdXJhdGlvbiA9IDApIHtcbiAgICB0YXJnZXQgPSB0eXBlb2YgdGFyZ2V0ID09PSBcInVuZGVmaW5lZFwiIHx8IHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgPyBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhhc2gpIDogdGFyZ2V0O1xuICAgIGlmICgkKHRhcmdldCkubGVuZ3RoKSB7XG4gICAgICB0YXJnZXQgPSBcIiNcIiArICQuZXNjYXBlU2VsZWN0b3IodGFyZ2V0LnN1YnN0cmluZygxKSk7XG4gICAgICBsZXQgZWxlbWVudE9mZnNldCA9IE1hdGguY2VpbCgkKHRhcmdldCkub2Zmc2V0KCkudG9wIC0gZ2V0TmF2QmFySGVpZ2h0KCkpO1xuICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJzY3JvbGxpbmdcIik7XG4gICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wOiBlbGVtZW50T2Zmc2V0XG4gICAgICB9LCBkdXJhdGlvbiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2Nyb2xsaW5nXCIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoXCJDYW5ub3Qgc2Nyb2xsIHRvIHRhcmdldCBgI1wiICsgdGFyZ2V0ICsgXCJgLiBJRCBub3QgZm91bmQhXCIpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBmaXhTY3JvbGxzcHkoKSB7XG4gICAgbGV0ICRib2R5ID0gJChcImJvZHlcIik7XG4gICAgbGV0IGRhdGEgPSAkYm9keS5kYXRhKFwiYnMuc2Nyb2xsc3B5XCIpO1xuICAgIGlmIChkYXRhKSB7XG4gICAgICBkYXRhLl9jb25maWcub2Zmc2V0ID0gZ2V0TmF2QmFySGVpZ2h0KCk7XG4gICAgICAkYm9keS5kYXRhKFwiYnMuc2Nyb2xsc3B5XCIsIGRhdGEpO1xuICAgICAgJGJvZHkuc2Nyb2xsc3B5KFwicmVmcmVzaFwiKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gcmVtb3ZlUXVlcnlQYXJhbXNGcm9tVXJsKCkge1xuICAgIGlmICh3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgIGxldCB1cmxXaXRob3V0U2VhcmNoUGFyYW1zID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7IHBhdGg6IHVybFdpdGhvdXRTZWFyY2hQYXJhbXMgfSwgXCJcIiwgdXJsV2l0aG91dFNlYXJjaFBhcmFtcyk7XG4gICAgfVxuICB9XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCBzY3JvbGxUb0FuY2hvcik7XG4gICQoXCIjbmF2YmFyLW1haW4gbGkubmF2LWl0ZW0gYS5uYXYtbGluaywgLmpzLXNjcm9sbFwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgbGV0IGhhc2ggPSB0aGlzLmhhc2g7XG4gICAgaWYgKHRoaXMucGF0aG5hbWUgPT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSAmJiBoYXNoICYmICQoaGFzaCkubGVuZ3RoICYmICQoXCIuanMtd2lkZ2V0LXBhZ2VcIikubGVuZ3RoID4gMCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGxldCBlbGVtZW50T2Zmc2V0ID0gTWF0aC5jZWlsKCQoaGFzaCkub2Zmc2V0KCkudG9wIC0gZ2V0TmF2QmFySGVpZ2h0KCkpO1xuICAgICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcDogZWxlbWVudE9mZnNldFxuICAgICAgfSwgODAwKTtcbiAgICB9XG4gIH0pO1xuICAkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLm5hdmJhci1jb2xsYXBzZS5zaG93XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBsZXQgdGFyZ2V0RWxlbWVudCA9ICQoZS50YXJnZXQpLmlzKFwiYVwiKSA/ICQoZS50YXJnZXQpIDogJChlLnRhcmdldCkucGFyZW50KCk7XG4gICAgaWYgKHRhcmdldEVsZW1lbnQuaXMoXCJhXCIpICYmIHRhcmdldEVsZW1lbnQuYXR0cihcImNsYXNzXCIpICE9IFwiZHJvcGRvd24tdG9nZ2xlXCIpIHtcbiAgICAgICQodGhpcykuY29sbGFwc2UoXCJoaWRlXCIpO1xuICAgIH1cbiAgfSk7XG4gIGZ1bmN0aW9uIHByaW50TGF0ZXN0UmVsZWFzZShzZWxlY3RvciwgcmVwbykge1xuICAgIGlmIChodWdvRW52aXJvbm1lbnQgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAkLmdldEpTT04oXCJodHRwczovL2FwaS5naXRodWIuY29tL3JlcG9zL1wiICsgcmVwbyArIFwiL3RhZ3NcIikuZG9uZShmdW5jdGlvbihqc29uKSB7XG4gICAgICAgIGxldCByZWxlYXNlID0ganNvblswXTtcbiAgICAgICAgJChzZWxlY3RvcikuYXBwZW5kKFwiIFwiICsgcmVsZWFzZS5uYW1lKTtcbiAgICAgIH0pLmZhaWwoZnVuY3Rpb24oanF4aHIsIHRleHRTdGF0dXMsIGVycm9yKSB7XG4gICAgICAgIGxldCBlcnIgPSB0ZXh0U3RhdHVzICsgXCIsIFwiICsgZXJyb3I7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUmVxdWVzdCBGYWlsZWQ6IFwiICsgZXJyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0b2dnbGVTZWFyY2hEaWFsb2coKSB7XG4gICAgaWYgKCQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2VhcmNoaW5nXCIpKSB7XG4gICAgICAkKFwiW2lkPXNlYXJjaC1xdWVyeV1cIikuYmx1cigpO1xuICAgICAgJChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzZWFyY2hpbmcgY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFyXCIpO1xuICAgICAgcmVtb3ZlUXVlcnlQYXJhbXNGcm9tVXJsKCk7XG4gICAgICAkKFwiI2ZhbmN5Ym94LXN0eWxlLW5vc2Nyb2xsXCIpLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoISQoXCIjZmFuY3lib3gtc3R5bGUtbm9zY3JvbGxcIikubGVuZ3RoICYmIGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICQoXCJoZWFkXCIpLmFwcGVuZCgnPHN0eWxlIGlkPVwiZmFuY3lib3gtc3R5bGUtbm9zY3JvbGxcIj4uY29tcGVuc2F0ZS1mb3Itc2Nyb2xsYmFye21hcmdpbi1yaWdodDonICsgKHdpbmRvdy5pbm5lcldpZHRoIC0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKSArIFwicHg7fTwvc3R5bGU+XCIpO1xuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImNvbXBlbnNhdGUtZm9yLXNjcm9sbGJhclwiKTtcbiAgICAgIH1cbiAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwic2VhcmNoaW5nXCIpO1xuICAgICAgJChcIi5zZWFyY2gtcmVzdWx0c1wiKS5jc3MoeyBvcGFjaXR5OiAwLCB2aXNpYmlsaXR5OiBcInZpc2libGVcIiB9KS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDApO1xuICAgICAgbGV0IGFsZ29saWFTZWFyY2hCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFpcy1TZWFyY2hCb3gtaW5wdXRcIik7XG4gICAgICBpZiAoYWxnb2xpYVNlYXJjaEJveCkge1xuICAgICAgICBhbGdvbGlhU2VhcmNoQm94LmZvY3VzKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKFwiI3NlYXJjaC1xdWVyeVwiKS5mb2N1cygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBmaXhIdWdvT3V0cHV0KCkge1xuICAgICQoXCIjVGFibGVPZkNvbnRlbnRzXCIpLmFkZENsYXNzKFwibmF2IGZsZXgtY29sdW1uXCIpO1xuICAgICQoXCIjVGFibGVPZkNvbnRlbnRzIGxpXCIpLmFkZENsYXNzKFwibmF2LWl0ZW1cIik7XG4gICAgJChcIiNUYWJsZU9mQ29udGVudHMgbGkgYVwiKS5hZGRDbGFzcyhcIm5hdi1saW5rXCIpO1xuICAgICQoXCJpbnB1dFt0eXBlPSdjaGVja2JveCddW2Rpc2FibGVkXVwiKS5wYXJlbnRzKFwidWxcIikuYWRkQ2xhc3MoXCJ0YXNrLWxpc3RcIik7XG4gIH1cbiAgZnVuY3Rpb24gZ2V0U2libGluZ3MoZWxlbSkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWxlbS5wYXJlbnROb2RlLmNoaWxkcmVuLCBmdW5jdGlvbihzaWJsaW5nKSB7XG4gICAgICByZXR1cm4gc2libGluZyAhPT0gZWxlbTtcbiAgICB9KTtcbiAgfVxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICBmaXhIdWdvT3V0cHV0KCk7XG4gICAgbGV0IHsgaXNEYXJrVGhlbWUsIHRoZW1lTW9kZSB9ID0gaW5pdFRoZW1lVmFyaWF0aW9uKCk7XG4gICAgcmVuZGVyVGhlbWVWYXJpYXRpb24oaXNEYXJrVGhlbWUsIHRoZW1lTW9kZSwgdHJ1ZSk7XG4gICAgaWYgKGNvZGVIaWdobGlnaHRpbmcpIHtcbiAgICAgIGhsanMuaW5pdEhpZ2hsaWdodGluZygpO1xuICAgIH1cbiAgICBsZXQgY2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvY3MtbGlua3MgLmFjdGl2ZVwiKTtcbiAgICBsZXQgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb2NzLWxpbmtzXCIpO1xuICAgIGlmIChjaGlsZCAmJiBwYXJlbnQpIHtcbiAgICAgIHNjcm9sbFBhcmVudFRvQ2hpbGQocGFyZW50LCBjaGlsZCk7XG4gICAgfVxuICB9KTtcbiAgJCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcbiAgICBmaXhTY3JvbGxzcHkoKTtcbiAgICBsZXQgaXNvdG9wZUluc3RhbmNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucHJvamVjdHMtY29udGFpbmVyXCIpO1xuICAgIGxldCBpc290b3BlSW5zdGFuY2VzQ291bnQgPSBpc290b3BlSW5zdGFuY2VzLmxlbmd0aDtcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2ggJiYgaXNvdG9wZUluc3RhbmNlc0NvdW50ID09PSAwKSB7XG4gICAgICBzY3JvbGxUb0FuY2hvcihkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhhc2gpLCAwKTtcbiAgICB9XG4gICAgbGV0IGNoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kb2NzLXRvYyAubmF2LWxpbmsuYWN0aXZlXCIpO1xuICAgIGxldCBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRvY3MtdG9jXCIpO1xuICAgIGlmIChjaGlsZCAmJiBwYXJlbnQpIHtcbiAgICAgIHNjcm9sbFBhcmVudFRvQ2hpbGQocGFyZW50LCBjaGlsZCk7XG4gICAgfVxuICAgIGxldCB6b29tT3B0aW9ucyA9IHt9O1xuICAgIGlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhcImRhcmtcIikpIHtcbiAgICAgIHpvb21PcHRpb25zLmJhY2tncm91bmQgPSBcInJnYmEoMCwwLDAsMC45KVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICB6b29tT3B0aW9ucy5iYWNrZ3JvdW5kID0gXCJyZ2JhKDI1NSwyNTUsMjU1LDAuOSlcIjtcbiAgICB9XG4gICAgbWVkaXVtX3pvb21fZXNtX2RlZmF1bHQoXCJbZGF0YS16b29tYWJsZV1cIiwgem9vbU9wdGlvbnMpO1xuICAgIGxldCBpc290b3BlQ291bnRlciA9IDA7XG4gICAgaXNvdG9wZUluc3RhbmNlcy5mb3JFYWNoKGZ1bmN0aW9uKGlzb3RvcGVJbnN0YW5jZSwgaW5kZXgpIHtcbiAgICAgIGNvbnNvbGUuZGVidWcoYExvYWRpbmcgSXNvdG9wZSBpbnN0YW5jZSAke2luZGV4fWApO1xuICAgICAgbGV0IGlzbztcbiAgICAgIGxldCBpc29TZWN0aW9uID0gaXNvdG9wZUluc3RhbmNlLmNsb3Nlc3QoXCJzZWN0aW9uXCIpO1xuICAgICAgbGV0IGxheW91dCA9IFwiXCI7XG4gICAgICBpZiAoaXNvU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLmlzb3RvcGVcIikuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtbGF5b3V0LXJvd1wiKSkge1xuICAgICAgICBsYXlvdXQgPSBcImZpdFJvd3NcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxheW91dCA9IFwibWFzb25yeVwiO1xuICAgICAgfVxuICAgICAgbGV0IGRlZmF1bHRGaWx0ZXIgPSBpc29TZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIuZGVmYXVsdC1wcm9qZWN0LWZpbHRlclwiKTtcbiAgICAgIGxldCBmaWx0ZXJUZXh0ID0gXCIqXCI7XG4gICAgICBpZiAoZGVmYXVsdEZpbHRlciAhPT0gbnVsbCkge1xuICAgICAgICBmaWx0ZXJUZXh0ID0gZGVmYXVsdEZpbHRlci50ZXh0Q29udGVudDtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZGVidWcoYERlZmF1bHQgSXNvdG9wZSBmaWx0ZXI6ICR7ZmlsdGVyVGV4dH1gKTtcbiAgICAgIGltYWdlc0xvYWRlZChpc290b3BlSW5zdGFuY2UsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpc28gPSBuZXcgSXNvdG9wZShpc290b3BlSW5zdGFuY2UsIHtcbiAgICAgICAgICBpdGVtU2VsZWN0b3I6IFwiLmlzb3RvcGUtaXRlbVwiLFxuICAgICAgICAgIGxheW91dE1vZGU6IGxheW91dCxcbiAgICAgICAgICBtYXNvbnJ5OiB7XG4gICAgICAgICAgICBndXR0ZXI6IDIwXG4gICAgICAgICAgfSxcbiAgICAgICAgICBmaWx0ZXI6IGZpbHRlclRleHRcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBpc29GaWx0ZXJCdXR0b25zID0gaXNvU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnByb2plY3QtZmlsdGVycyBhXCIpO1xuICAgICAgICBpc29GaWx0ZXJCdXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4gYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBsZXQgc2VsZWN0b3IgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS1maWx0ZXJcIik7XG4gICAgICAgICAgY29uc29sZS5kZWJ1ZyhgVXBkYXRpbmcgSXNvdG9wZSBmaWx0ZXIgdG8gJHtzZWxlY3Rvcn1gKTtcbiAgICAgICAgICBpc28uYXJyYW5nZSh7IGZpbHRlcjogc2VsZWN0b3IgfSk7XG4gICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgbGV0IGJ1dHRvblNpYmxpbmdzID0gZ2V0U2libGluZ3MoYnV0dG9uKTtcbiAgICAgICAgICBidXR0b25TaWJsaW5ncy5mb3JFYWNoKChidXR0b25TaWJsaW5nKSA9PiB7XG4gICAgICAgICAgICBidXR0b25TaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBidXR0b25TaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoXCJhbGxcIik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICAgICAgaW5jcmVtZW50SXNvdG9wZUNvdW50ZXIoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIGluY3JlbWVudElzb3RvcGVDb3VudGVyKCkge1xuICAgICAgaXNvdG9wZUNvdW50ZXIrKztcbiAgICAgIGlmIChpc290b3BlQ291bnRlciA9PT0gaXNvdG9wZUluc3RhbmNlc0NvdW50KSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoYEFsbCBQb3J0Zm9saW8gSXNvdG9wZSBpbnN0YW5jZXMgbG9hZGVkLmApO1xuICAgICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgICAgICBzY3JvbGxUb0FuY2hvcihkZWNvZGVVUklDb21wb25lbnQod2luZG93LmxvY2F0aW9uLmhhc2gpLCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgZ2l0aHViUmVsZWFzZVNlbGVjdG9yID0gXCIuanMtZ2l0aHViLXJlbGVhc2VcIjtcbiAgICBpZiAoJChnaXRodWJSZWxlYXNlU2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgIHByaW50TGF0ZXN0UmVsZWFzZShnaXRodWJSZWxlYXNlU2VsZWN0b3IsICQoZ2l0aHViUmVsZWFzZVNlbGVjdG9yKS5kYXRhKFwicmVwb1wiKSk7XG4gICAgfVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5jb2RlID09PSBcIkVzY2FwZVwiKSB7XG4gICAgICAgIGNvbnN0IGJvZHkyID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgaWYgKGJvZHkyLmNsYXNzTGlzdC5jb250YWlucyhcInNlYXJjaGluZ1wiKSkge1xuICAgICAgICAgIHRvZ2dsZVNlYXJjaERpYWxvZygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZXZlbnQua2V5ID09PSBcIi9cIikge1xuICAgICAgICBsZXQgZm9jdXNlZEVsZW1lbnQgPSBkb2N1bWVudC5oYXNGb2N1cygpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IGRvY3VtZW50LmJvZHkgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgfHwgbnVsbDtcbiAgICAgICAgbGV0IGlzSW5wdXRGb2N1c2VkID0gZm9jdXNlZEVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MSW5wdXRFbGVtZW50IHx8IGZvY3VzZWRFbGVtZW50IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICAgICAgaWYgKHNlYXJjaEVuYWJsZWQgJiYgIWlzSW5wdXRGb2N1c2VkKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0b2dnbGVTZWFyY2hEaWFsb2coKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChzZWFyY2hFbmFibGVkKSB7XG4gICAgICAkKFwiLmpzLXNlYXJjaFwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdG9nZ2xlU2VhcmNoRGlhbG9nKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoKTtcbiAgfSk7XG4gIHZhciBsaW5rTGlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmpzLXNldC10aGVtZS1saWdodFwiKTtcbiAgdmFyIGxpbmtEYXJrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1zZXQtdGhlbWUtZGFya1wiKTtcbiAgdmFyIGxpbmtBdXRvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1zZXQtdGhlbWUtYXV0b1wiKTtcbiAgaWYgKGxpbmtMaWdodCAmJiBsaW5rRGFyayAmJiBsaW5rQXV0bykge1xuICAgIGxpbmtMaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY2hhbmdlVGhlbWVNb2RlQ2xpY2soMCk7XG4gICAgfSk7XG4gICAgbGlua0RhcmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGNoYW5nZVRoZW1lTW9kZUNsaWNrKDEpO1xuICAgIH0pO1xuICAgIGxpbmtBdXRvLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjaGFuZ2VUaGVtZU1vZGVDbGljaygyKTtcbiAgICB9KTtcbiAgfVxuICB2YXIgZGFya01vZGVNZWRpYVF1ZXJ5ID0gd2luZG93Lm1hdGNoTWVkaWEoXCIocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspXCIpO1xuICBkYXJrTW9kZU1lZGlhUXVlcnkuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQpID0+IHtcbiAgICBvbk1lZGlhUXVlcnlMaXN0RXZlbnQoZXZlbnQpO1xuICB9KTtcbiAgJChcImJvZHlcIikub24oXCJtb3VzZWVudGVyIG1vdXNlbGVhdmVcIiwgXCIuZHJvcGRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgIHZhciBkcm9wZG93biA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuZHJvcGRvd25cIik7XG4gICAgdmFyIG1lbnUgPSAkKFwiLmRyb3Bkb3duLW1lbnVcIiwgZHJvcGRvd24pO1xuICAgIGRyb3Bkb3duLmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICBtZW51LmFkZENsYXNzKFwic2hvd1wiKTtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgZHJvcGRvd25bZHJvcGRvd24uaXMoXCI6aG92ZXJcIikgPyBcImFkZENsYXNzXCIgOiBcInJlbW92ZUNsYXNzXCJdKFwic2hvd1wiKTtcbiAgICAgIG1lbnVbZHJvcGRvd24uaXMoXCI6aG92ZXJcIikgPyBcImFkZENsYXNzXCIgOiBcInJlbW92ZUNsYXNzXCJdKFwic2hvd1wiKTtcbiAgICB9LCAzMDApO1xuICB9KTtcbiAgdmFyIHJlc2l6ZVRpbWVyO1xuICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuICAgIGNsZWFyVGltZW91dChyZXNpemVUaW1lcik7XG4gICAgcmVzaXplVGltZXIgPSBzZXRUaW1lb3V0KGZpeFNjcm9sbHNweSwgMjAwKTtcbiAgfSk7XG59KSgpO1xuLyohIG1lZGl1bS16b29tIDEuMC42IHwgTUlUIExpY2Vuc2UgfCBodHRwczovL2dpdGh1Yi5jb20vZnJhbmNvaXNjaGFsaWZvdXIvbWVkaXVtLXpvb20gKi9cblxuO1xuKCgpID0+IHtcbiAgLy8gbnMtcGFyYW1zOkBwYXJhbXNcbiAgdmFyIGNvbnRlbnRfdHlwZSA9IHsgYXV0aG9yczogXCJBdXRob3JzXCIsIGV2ZW50OiBcIkV2ZW50c1wiLCBwb3N0OiBcIlBvc3RzXCIsIHByb2plY3Q6IFwiUHJvamVjdHNcIiwgcHVibGljYXRpb246IFwiUHVibGljYXRpb25zXCIsIHNsaWRlczogXCJTbGlkZXNcIiB9O1xuICB2YXIgaTE4biA9IHsgbm9fcmVzdWx0czogXCJObyByZXN1bHRzIGZvdW5kXCIsIHBsYWNlaG9sZGVyOiBcIlNlYXJjaC4uLlwiLCByZXN1bHRzOiBcInJlc3VsdHMgZm91bmRcIiB9O1xuICB2YXIgc2VhcmNoX2NvbmZpZyA9IHsgaW5kZXhVUkk6IFwiL2luZGV4Lmpzb25cIiwgbWluTGVuZ3RoOiAxLCB0aHJlc2hvbGQ6IDAuMyB9O1xuXG4gIC8vIDxzdGRpbj5cbiAgdmFyIGZ1c2VPcHRpb25zID0ge1xuICAgIHNob3VsZFNvcnQ6IHRydWUsXG4gICAgaW5jbHVkZU1hdGNoZXM6IHRydWUsXG4gICAgdG9rZW5pemU6IHRydWUsXG4gICAgdGhyZXNob2xkOiBzZWFyY2hfY29uZmlnLnRocmVzaG9sZCxcbiAgICBsb2NhdGlvbjogMCxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIG1heFBhdHRlcm5MZW5ndGg6IDMyLFxuICAgIG1pbk1hdGNoQ2hhckxlbmd0aDogc2VhcmNoX2NvbmZpZy5taW5MZW5ndGgsXG4gICAga2V5czogW1xuICAgICAgeyBuYW1lOiBcInRpdGxlXCIsIHdlaWdodDogMC45OSB9LFxuICAgICAgeyBuYW1lOiBcInN1bW1hcnlcIiwgd2VpZ2h0OiAwLjYgfSxcbiAgICAgIHsgbmFtZTogXCJhdXRob3JzXCIsIHdlaWdodDogMC41IH0sXG4gICAgICB7IG5hbWU6IFwiY29udGVudFwiLCB3ZWlnaHQ6IDAuMiB9LFxuICAgICAgeyBuYW1lOiBcInRhZ3NcIiwgd2VpZ2h0OiAwLjUgfSxcbiAgICAgIHsgbmFtZTogXCJjYXRlZ29yaWVzXCIsIHdlaWdodDogMC41IH1cbiAgICBdXG4gIH07XG4gIHZhciBzdW1tYXJ5TGVuZ3RoID0gNjA7XG4gIGZ1bmN0aW9uIGdldFNlYXJjaFF1ZXJ5KG5hbWUpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KChsb2NhdGlvbi5zZWFyY2guc3BsaXQobmFtZSArIFwiPVwiKVsxXSB8fCBcIlwiKS5zcGxpdChcIiZcIilbMF0pLnJlcGxhY2UoL1xcKy9nLCBcIiBcIik7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlVVJMKHVybCkge1xuICAgIGlmIChoaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHsgcGF0aDogdXJsIH0sIFwiXCIsIHVybCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGluaXRTZWFyY2goZm9yY2UsIGZ1c2UpIHtcbiAgICBsZXQgcXVlcnkgPSAkKFwiI3NlYXJjaC1xdWVyeVwiKS52YWwoKTtcbiAgICBpZiAocXVlcnkubGVuZ3RoIDwgMSkge1xuICAgICAgJChcIiNzZWFyY2gtaGl0c1wiKS5lbXB0eSgpO1xuICAgICAgJChcIiNzZWFyY2gtY29tbW9uLXF1ZXJpZXNcIikuc2hvdygpO1xuICAgIH1cbiAgICBpZiAoIWZvcmNlICYmIHF1ZXJ5Lmxlbmd0aCA8IGZ1c2VPcHRpb25zLm1pbk1hdGNoQ2hhckxlbmd0aClcbiAgICAgIHJldHVybjtcbiAgICAkKFwiI3NlYXJjaC1oaXRzXCIpLmVtcHR5KCk7XG4gICAgJChcIiNzZWFyY2gtY29tbW9uLXF1ZXJpZXNcIikuaGlkZSgpO1xuICAgIHNlYXJjaEFjYWRlbWljKHF1ZXJ5LCBmdXNlKTtcbiAgICBsZXQgbmV3VVJMID0gd2luZG93LmxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgd2luZG93LmxvY2F0aW9uLmhvc3QgKyB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgKyBcIj9xPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KSArIHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xuICAgIHVwZGF0ZVVSTChuZXdVUkwpO1xuICB9XG4gIGZ1bmN0aW9uIHNlYXJjaEFjYWRlbWljKHF1ZXJ5LCBmdXNlKSB7XG4gICAgbGV0IHJlc3VsdHMgPSBmdXNlLnNlYXJjaChxdWVyeSk7XG4gICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xuICAgICAgJChcIiNzZWFyY2gtaGl0c1wiKS5hcHBlbmQoJzxoMyBjbGFzcz1cIm10LTBcIj4nICsgcmVzdWx0cy5sZW5ndGggKyBcIiBcIiArIGkxOG4ucmVzdWx0cyArIFwiPC9oMz5cIik7XG4gICAgICBwYXJzZVJlc3VsdHMocXVlcnksIHJlc3VsdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKFwiI3NlYXJjaC1oaXRzXCIpLmFwcGVuZCgnPGRpdiBjbGFzcz1cInNlYXJjaC1uby1yZXN1bHRzXCI+JyArIGkxOG4ubm9fcmVzdWx0cyArIFwiPC9kaXY+XCIpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBwYXJzZVJlc3VsdHMocXVlcnksIHJlc3VsdHMpIHtcbiAgICAkLmVhY2gocmVzdWx0cywgZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgbGV0IGNvbnRlbnRfa2V5ID0gdmFsdWUuaXRlbS5zZWN0aW9uO1xuICAgICAgbGV0IGNvbnRlbnQgPSBcIlwiO1xuICAgICAgbGV0IHNuaXBwZXQgPSBcIlwiO1xuICAgICAgbGV0IHNuaXBwZXRIaWdobGlnaHRzID0gW107XG4gICAgICBpZiAoW1wicHVibGljYXRpb25cIiwgXCJldmVudFwiXS5pbmNsdWRlcyhjb250ZW50X2tleSkpIHtcbiAgICAgICAgY29udGVudCA9IHZhbHVlLml0ZW0uc3VtbWFyeTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQgPSB2YWx1ZS5pdGVtLmNvbnRlbnQ7XG4gICAgICB9XG4gICAgICBpZiAoZnVzZU9wdGlvbnMudG9rZW5pemUpIHtcbiAgICAgICAgc25pcHBldEhpZ2hsaWdodHMucHVzaChxdWVyeSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkLmVhY2godmFsdWUubWF0Y2hlcywgZnVuY3Rpb24obWF0Y2hLZXksIG1hdGNoVmFsdWUpIHtcbiAgICAgICAgICBpZiAobWF0Y2hWYWx1ZS5rZXkgPT0gXCJjb250ZW50XCIpIHtcbiAgICAgICAgICAgIGxldCBzdGFydCA9IG1hdGNoVmFsdWUuaW5kaWNlc1swXVswXSAtIHN1bW1hcnlMZW5ndGggPiAwID8gbWF0Y2hWYWx1ZS5pbmRpY2VzWzBdWzBdIC0gc3VtbWFyeUxlbmd0aCA6IDA7XG4gICAgICAgICAgICBsZXQgZW5kID0gbWF0Y2hWYWx1ZS5pbmRpY2VzWzBdWzFdICsgc3VtbWFyeUxlbmd0aCA8IGNvbnRlbnQubGVuZ3RoID8gbWF0Y2hWYWx1ZS5pbmRpY2VzWzBdWzFdICsgc3VtbWFyeUxlbmd0aCA6IGNvbnRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgc25pcHBldCArPSBjb250ZW50LnN1YnN0cmluZyhzdGFydCwgZW5kKTtcbiAgICAgICAgICAgIHNuaXBwZXRIaWdobGlnaHRzLnB1c2gobWF0Y2hWYWx1ZS52YWx1ZS5zdWJzdHJpbmcobWF0Y2hWYWx1ZS5pbmRpY2VzWzBdWzBdLCBtYXRjaFZhbHVlLmluZGljZXNbMF1bMV0gLSBtYXRjaFZhbHVlLmluZGljZXNbMF1bMF0gKyAxKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChzbmlwcGV0Lmxlbmd0aCA8IDEpIHtcbiAgICAgICAgc25pcHBldCArPSB2YWx1ZS5pdGVtLnN1bW1hcnk7XG4gICAgICB9XG4gICAgICBsZXQgdGVtcGxhdGUgPSAkKFwiI3NlYXJjaC1oaXQtZnVzZS10ZW1wbGF0ZVwiKS5odG1sKCk7XG4gICAgICBpZiAoY29udGVudF9rZXkgaW4gY29udGVudF90eXBlKSB7XG4gICAgICAgIGNvbnRlbnRfa2V5ID0gY29udGVudF90eXBlW2NvbnRlbnRfa2V5XTtcbiAgICAgIH1cbiAgICAgIGxldCB0ZW1wbGF0ZURhdGEgPSB7XG4gICAgICAgIGtleSxcbiAgICAgICAgdGl0bGU6IHZhbHVlLml0ZW0udGl0bGUsXG4gICAgICAgIHR5cGU6IGNvbnRlbnRfa2V5LFxuICAgICAgICByZWxwZXJtYWxpbms6IHZhbHVlLml0ZW0ucmVscGVybWFsaW5rLFxuICAgICAgICBzbmlwcGV0XG4gICAgICB9O1xuICAgICAgbGV0IG91dHB1dCA9IHJlbmRlcih0ZW1wbGF0ZSwgdGVtcGxhdGVEYXRhKTtcbiAgICAgICQoXCIjc2VhcmNoLWhpdHNcIikuYXBwZW5kKG91dHB1dCk7XG4gICAgICAkLmVhY2goc25pcHBldEhpZ2hsaWdodHMsIGZ1bmN0aW9uKGhsS2V5LCBobFZhbHVlKSB7XG4gICAgICAgICQoXCIjc3VtbWFyeS1cIiArIGtleSkubWFyayhobFZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHJlbmRlcih0ZW1wbGF0ZSwgZGF0YSkge1xuICAgIGxldCBrZXksIGZpbmQsIHJlO1xuICAgIGZvciAoa2V5IGluIGRhdGEpIHtcbiAgICAgIGZpbmQgPSBcIlxcXFx7XFxcXHtcXFxccypcIiArIGtleSArIFwiXFxcXHMqXFxcXH1cXFxcfVwiO1xuICAgICAgcmUgPSBuZXcgUmVnRXhwKGZpbmQsIFwiZ1wiKTtcbiAgICAgIHRlbXBsYXRlID0gdGVtcGxhdGUucmVwbGFjZShyZSwgZGF0YVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG4gIGlmICh0eXBlb2YgRnVzZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgJC5nZXRKU09OKHNlYXJjaF9jb25maWcuaW5kZXhVUkksIGZ1bmN0aW9uKHNlYXJjaF9pbmRleCkge1xuICAgICAgbGV0IGZ1c2UgPSBuZXcgRnVzZShzZWFyY2hfaW5kZXgsIGZ1c2VPcHRpb25zKTtcbiAgICAgIGxldCBxdWVyeSA9IGdldFNlYXJjaFF1ZXJ5KFwicVwiKTtcbiAgICAgIGlmIChxdWVyeSkge1xuICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcInNlYXJjaGluZ1wiKTtcbiAgICAgICAgJChcIi5zZWFyY2gtcmVzdWx0c1wiKS5jc3MoeyBvcGFjaXR5OiAwLCB2aXNpYmlsaXR5OiBcInZpc2libGVcIiB9KS5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDApO1xuICAgICAgICAkKFwiI3NlYXJjaC1xdWVyeVwiKS52YWwocXVlcnkpO1xuICAgICAgICAkKFwiI3NlYXJjaC1xdWVyeVwiKS5mb2N1cygpO1xuICAgICAgICBpbml0U2VhcmNoKHRydWUsIGZ1c2UpO1xuICAgICAgfVxuICAgICAgJChcIiNzZWFyY2gtcXVlcnlcIikua2V5dXAoZnVuY3Rpb24oZSkge1xuICAgICAgICBjbGVhclRpbWVvdXQoJC5kYXRhKHRoaXMsIFwic2VhcmNoVGltZXJcIikpO1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzKSB7XG4gICAgICAgICAgaW5pdFNlYXJjaCh0cnVlLCBmdXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMpLmRhdGEoXCJzZWFyY2hUaW1lclwiLCBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaW5pdFNlYXJjaChmYWxzZSwgZnVzZSk7XG4gICAgICAgICAgfSwgMjUwKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59KSgpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxFQUFDLE9BQU07QUFFTCxRQUFJLFdBQVcsT0FBTyxVQUFVLFNBQVMsUUFBUTtBQUMvQyxlQUFTLElBQUksR0FBRyxJQUFJLFVBQVUsUUFBUSxLQUFLO0FBQ3pDLFlBQUksU0FBUyxVQUFVO0FBQ3ZCLGlCQUFTLE9BQU8sUUFBUTtBQUN0QixjQUFJLE9BQU8sVUFBVSxlQUFlLEtBQUssUUFBUSxNQUFNO0FBQ3JELG1CQUFPLE9BQU8sT0FBTztBQUFBO0FBQUE7QUFBQTtBQUkzQixhQUFPO0FBQUE7QUFFVCxRQUFJLGNBQWMsc0JBQXNCLE1BQU07QUFDNUMsYUFBTyxLQUFLLFlBQVk7QUFBQTtBQUUxQixRQUFJLGFBQWEscUJBQXFCLFVBQVU7QUFDOUMsYUFBTyxTQUFTLFVBQVUsY0FBYztBQUFBO0FBRTFDLFFBQUksU0FBUyxpQkFBaUIsVUFBVTtBQUN0QyxhQUFPLFlBQVksU0FBUyxhQUFhO0FBQUE7QUFFM0MsUUFBSSxRQUFRLGdCQUFnQixPQUFPO0FBQ2pDLFVBQUksU0FBUyxNQUFNLGNBQWMsTUFBTTtBQUN2QyxhQUFPLE9BQU8sT0FBTyxJQUFJLGtCQUFrQjtBQUFBO0FBRTdDLFFBQUksd0JBQXdCLGdDQUFnQyxVQUFVO0FBQ3BFLFVBQUk7QUFDRixZQUFJLE1BQU0sUUFBUSxXQUFXO0FBQzNCLGlCQUFPLFNBQVMsT0FBTztBQUFBO0FBRXpCLFlBQUksV0FBVyxXQUFXO0FBQ3hCLGlCQUFPLEdBQUcsTUFBTSxLQUFLLFVBQVUsT0FBTztBQUFBO0FBRXhDLFlBQUksT0FBTyxXQUFXO0FBQ3BCLGlCQUFPLENBQUMsVUFBVSxPQUFPO0FBQUE7QUFFM0IsWUFBSSxPQUFPLGFBQWEsVUFBVTtBQUNoQyxpQkFBTyxHQUFHLE1BQU0sS0FBSyxT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
