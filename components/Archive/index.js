'use client'
import { useState } from 'react';
const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

export default function Archive() {
  const [showBorder, setShowBorder] = useState(false);
  const [respMessage, setRespMessage] = useState('');

  const onArchiveClick = () => {
    fetch(`${API_URL}/api/archive`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((resp) => {
      if (resp.status === 200) {
        setShowBorder(true);
        setTimeout(() => setShowBorder(false), 1000);
        resp.json().then((body) => setRespMessage(body.message));
      }
    });
  }
  return (
    <button className={`main_btn ${showBorder ? 'main_border' : ''}`} onClick={onArchiveClick}>
      Archive
    </button>
  )
}
