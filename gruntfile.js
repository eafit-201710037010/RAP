module.exports = function(grunt) {
    grunt.initConfig({
        ts: {
            default: {
                src: ["**/*.ts", "!node_modules/**/*.ts"],
                outDir: "dist",
                options: {
                    allowJs: true,
                    allowSyntethicDefaultImports: true,
                    allowUnrecheableCode: true,
                    module: 'umd',
                    comments: true,
                    emitDecoratorMetadata: true
                }
            }
        }
    });
    grunt.loadNpmTasks("grunt-ts")
    grunt.registerTask("default", ["ts"])
};