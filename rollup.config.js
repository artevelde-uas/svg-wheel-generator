import babel from 'rollup-plugin-babel';


export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/svg-wheel-generator.js',
            format: 'cjs'
        },
        {
            file: 'dist/svg-wheel-generator.esm.js',
            format: 'esm'
        }
    ],
    external: [
        'kld-intersections'
    ],
    plugins: [
        babel()
    ]
};
