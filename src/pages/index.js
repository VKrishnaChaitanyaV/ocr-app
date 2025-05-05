import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('image', e.target.image.files[0]);

    fetch('/api/ocr', {
      method: 'POST',
      body: formData,
    }).then(res=>res.json()).then(data=>{
        setText(data.text || data.error || 'No text found');
        setLoading(false);
    }).catch((ex)=>{
        debugger;
    });

    //const data = await res.json();
    
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Image to Text (OCR)</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" required />
        <button type="submit">{loading ? 'Processing...' : 'Extract Text'}</button>
      </form>
      <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{text}</pre>
    </div>
  );
}
