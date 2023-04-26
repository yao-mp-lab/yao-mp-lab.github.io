/*! Wowchemy v5.4.0 | https://wowchemy.com/ */
/*! Copyright 2016-present George Cushen (https://georgecushen.com/) */
/*! License: https://github.com/wowchemy/wowchemy-hugo-themes/blob/main/LICENSE.md */

;
(() => {
  // <stdin>
  (() => {
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
    var wcDarkLightEnabled = "ocean";
    var wcIsSiteThemeDark = false;
    window.wc = {
      darkLightEnabled: wcDarkLightEnabled,
      isSiteThemeDark: wcIsSiteThemeDark
    };
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/";
          });
        }
      });
    }
    initThemeVariation();
    window.PlotlyConfig = { MathJaxConfig: "local" };
  })();
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiPHN0ZGluPiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiKCgpID0+IHtcbiAgLy8gbnMtaHVnbzovdmFyL2ZvbGRlcnMvZGYvcXg1OF9jejk0MnE4YzR4dDlwNTRuNWowMDAwMGduL1QvaHVnb19jYWNoZS9tb2R1bGVzL2ZpbGVjYWNoZS9tb2R1bGVzL3BrZy9tb2QvZ2l0aHViLmNvbS93b3djaGVteS93b3djaGVteS1odWdvLW1vZHVsZXMvd293Y2hlbXkvdjVAdjUuMC4wLTIwMjIwMjE0MjEyMjU0LTcwODA2NDE0NDM3YS9hc3NldHMvanMvd293Y2hlbXktdGhlbWluZy5qc1xuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIGZ1bmN0aW9uIGdldFRoZW1lTW9kZSgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ3Y1RoZW1lXCIpIHx8IDIpO1xuICB9XG4gIGZ1bmN0aW9uIGNhbkNoYW5nZVRoZW1lKCkge1xuICAgIHJldHVybiBCb29sZWFuKHdpbmRvdy53Yy5kYXJrTGlnaHRFbmFibGVkKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0VGhlbWVWYXJpYXRpb24oKSB7XG4gICAgaWYgKCFjYW5DaGFuZ2VUaGVtZSgpKSB7XG4gICAgICBjb25zb2xlLmRlYnVnKFwiVXNlciB0aGVtaW5nIGRpc2FibGVkLlwiKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGlzRGFya1RoZW1lOiB3aW5kb3cud2MuaXNTaXRlVGhlbWVEYXJrLFxuICAgICAgICB0aGVtZU1vZGU6IHdpbmRvdy53Yy5pc1NpdGVUaGVtZURhcmsgPyAxIDogMFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc29sZS5kZWJ1ZyhcIlVzZXIgdGhlbWluZyBlbmFibGVkLlwiKTtcbiAgICBsZXQgaXNEYXJrVGhlbWU7XG4gICAgbGV0IGN1cnJlbnRUaGVtZU1vZGUgPSBnZXRUaGVtZU1vZGUoKTtcbiAgICBjb25zb2xlLmRlYnVnKGBVc2VyJ3MgdGhlbWUgdmFyaWF0aW9uOiAke2N1cnJlbnRUaGVtZU1vZGV9YCk7XG4gICAgc3dpdGNoIChjdXJyZW50VGhlbWVNb2RlKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIGlzRGFya1RoZW1lID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpc0RhcmtUaGVtZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKVwiKS5tYXRjaGVzKSB7XG4gICAgICAgICAgaXNEYXJrVGhlbWUgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodClcIikubWF0Y2hlcykge1xuICAgICAgICAgIGlzRGFya1RoZW1lID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXNEYXJrVGhlbWUgPSB3aW5kb3cud2MuaXNTaXRlVGhlbWVEYXJrO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoaXNEYXJrVGhlbWUgJiYgIWJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGFya1wiKSkge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIkFwcGx5aW5nIFdvd2NoZW15IGRhcmsgdGhlbWVcIik7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJkYXJrXCIpO1xuICAgIH0gZWxzZSBpZiAoIWlzRGFya1RoZW1lICYmIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGFya1wiKSkge1xuICAgICAgY29uc29sZS5kZWJ1ZyhcIkFwcGx5aW5nIFdvd2NoZW15IGxpZ2h0IHRoZW1lXCIpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiZGFya1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzRGFya1RoZW1lLFxuICAgICAgdGhlbWVNb2RlOiBjdXJyZW50VGhlbWVNb2RlXG4gICAgfTtcbiAgfVxuXG4gIC8vIG5zLXBhcmFtczpAcGFyYW1zXG4gIHZhciB3Y0RhcmtMaWdodEVuYWJsZWQgPSBcIm9jZWFuXCI7XG4gIHZhciB3Y0lzU2l0ZVRoZW1lRGFyayA9IGZhbHNlO1xuXG4gIC8vIDxzdGRpbj5cbiAgd2luZG93LndjID0ge1xuICAgIGRhcmtMaWdodEVuYWJsZWQ6IHdjRGFya0xpZ2h0RW5hYmxlZCxcbiAgICBpc1NpdGVUaGVtZURhcms6IHdjSXNTaXRlVGhlbWVEYXJrXG4gIH07XG4gIGlmICh3aW5kb3cubmV0bGlmeUlkZW50aXR5KSB7XG4gICAgd2luZG93Lm5ldGxpZnlJZGVudGl0eS5vbihcImluaXRcIiwgKHVzZXIpID0+IHtcbiAgICAgIGlmICghdXNlcikge1xuICAgICAgICB3aW5kb3cubmV0bGlmeUlkZW50aXR5Lm9uKFwibG9naW5cIiwgKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBcIi9hZG1pbi9cIjtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgaW5pdFRoZW1lVmFyaWF0aW9uKCk7XG4gIHdpbmRvdy5QbG90bHlDb25maWcgPSB7IE1hdGhKYXhDb25maWc6IFwibG9jYWxcIiB9O1xufSkoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsRUFBQyxPQUFNO0FBRUwsUUFBSSxPQUFPLFNBQVM7QUFDcEIsNEJBQXdCO0FBQ3RCLGFBQU8sU0FBUyxhQUFhLFFBQVEsY0FBYztBQUFBO0FBRXJELDhCQUEwQjtBQUN4QixhQUFPLFFBQVEsT0FBTyxHQUFHO0FBQUE7QUFFM0Isa0NBQThCO0FBQzVCLFVBQUksQ0FBQyxrQkFBa0I7QUFDckIsZ0JBQVEsTUFBTTtBQUNkLGVBQU87QUFBQSxVQUNMLGFBQWEsT0FBTyxHQUFHO0FBQUEsVUFDdkIsV0FBVyxPQUFPLEdBQUcsa0JBQWtCLElBQUk7QUFBQTtBQUFBO0FBRy9DLGNBQVEsTUFBTTtBQUNkLFVBQUk7QUFDSixVQUFJLG1CQUFtQjtBQUN2QixjQUFRLE1BQU0sMkJBQTJCO0FBQ3pDLGNBQVE7QUFBQSxhQUNEO0FBQ0gsd0JBQWM7QUFDZDtBQUFBLGFBQ0c7QUFDSCx3QkFBYztBQUNkO0FBQUE7QUFFQSxjQUFJLE9BQU8sV0FBVyxnQ0FBZ0MsU0FBUztBQUM3RCwwQkFBYztBQUFBLHFCQUNMLE9BQU8sV0FBVyxpQ0FBaUMsU0FBUztBQUNyRSwwQkFBYztBQUFBLGlCQUNUO0FBQ0wsMEJBQWMsT0FBTyxHQUFHO0FBQUE7QUFFMUI7QUFBQTtBQUVKLFVBQUksZUFBZSxDQUFDLEtBQUssVUFBVSxTQUFTLFNBQVM7QUFDbkQsZ0JBQVEsTUFBTTtBQUNkLGlCQUFTLEtBQUssVUFBVSxJQUFJO0FBQUEsaUJBQ25CLENBQUMsZUFBZSxLQUFLLFVBQVUsU0FBUyxTQUFTO0FBQzFELGdCQUFRLE1BQU07QUFDZCxpQkFBUyxLQUFLLFVBQVUsT0FBTztBQUFBO0FBRWpDLGFBQU87QUFBQSxRQUNMO0FBQUEsUUFDQSxXQUFXO0FBQUE7QUFBQTtBQUtmLFFBQUkscUJBQXFCO0FBQ3pCLFFBQUksb0JBQW9CO0FBR3hCLFdBQU8sS0FBSztBQUFBLE1BQ1Ysa0JBQWtCO0FBQUEsTUFDbEIsaUJBQWlCO0FBQUE7QUFFbkIsUUFBSSxPQUFPLGlCQUFpQjtBQUMxQixhQUFPLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxTQUFTO0FBQzFDLFlBQUksQ0FBQyxNQUFNO0FBQ1QsaUJBQU8sZ0JBQWdCLEdBQUcsU0FBUyxNQUFNO0FBQ3ZDLHFCQUFTLFNBQVMsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS2pDO0FBQ0EsV0FBTyxlQUFlLEVBQUUsZUFBZTtBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
