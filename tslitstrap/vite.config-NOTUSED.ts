import litcss from 'rollup-plugin-lit-css';
  export default {
    plugins: [
      litcss({exclude:["src/style.css"]}) //{exclude:["src/style.css"]}
    ]
  }