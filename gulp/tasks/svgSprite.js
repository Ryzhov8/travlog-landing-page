import svgSprite from "gulp-svg-sprite";

export const sprite = () =>
  app.gulp
    .src(app.path.src.svgicons, {})
    .pipe(
      app.plugins.gulpPlumber(
        app.plugins.notify.onError({
          title: "SVG",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../icons/icons.svg",
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.srcFolder}/img`));
