import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import webpcss from "gulp-webpcss";
import GulpCleanCss from "gulp-clean-css";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";

const sass = gulpSass(dartSass);

export const scss = () =>
  app.gulp
    .src(app.path.src.scss, { sourcemaps: app.isDev })
    .pipe(
      app.plugins.gulpPlumber(
        app.plugins.notify.onError({
          title: "SCSS",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(app.plugins.replace(/@img\//g, "../img/"))
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(app.plugins.gulpIf(app.isBuild, groupCssMediaQueries()))
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        webpcss({
          webpClass: ".webp",
          noWebpClass: ".no-webp",
        })
      )
    )
    .pipe(
      app.plugins.gulpIf(
        app.isBuild,
        autoPrefixer({
          grid: true,
          overrideBrowserslist: ["last 3 versions"],
          cascade: true,
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.gulpIf(app.isBuild, GulpCleanCss()))
    .pipe(
      rename({
        extname: ".min.css",
      })
    )
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browserSync.stream());
