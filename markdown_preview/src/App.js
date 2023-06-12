import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

export default function App() {
  // Función para obtener el markdown por defecto
  const getDefaultMarkdown = () => {
    return `
# Heading
## Sub Heading
[Link](https://www.example.com)
Inline \`code\`
\`\`\`
// Code Block
function example() {
  return 'Hello, world!';
}
\`\`\`
- List item
> Blockquote
![Image](https://www.example.com/image.jpg)
**Bolded Text**

Line 1  
Line 2  
Line 3
  `;
  };

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    setMarkdown(getDefaultMarkdown());
  }, []);

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (

    <div className="container mt-3 " >
      <div className="row row-cols-2 p-5 bg-secondary rounded-5">
        <div >
          <h1 className='text-center text-warning'>INTPUT</h1>
          <textarea className="col-12 bg-dark p-4 text-light rounded-2" style={{ height: "91%" }} id="editor" value={markdown} onChange={handleChange}
          ></textarea>
        </div>
        <div className="col-6 " id="preview">
          <h1 className='text-center text-info' >OUTPUT</h1>
          <ReactMarkdown
            renderers={{ text: (props) => <p>{props.children}</p> }}
            escapeHtml={false}
            children={markdown.replace(/\n/g, "  \n")}
            className='bg-dark p-4 text-light rounded-2' />
        </div>
      </div>
      <p className="text-center mt-3 h5"> <a href='https://github.com/DanielUrregoL' className='text-dark' ><i className="bi bi-github"></i> By @DanielUrregoL</a></p>
    </div>

  );
}
