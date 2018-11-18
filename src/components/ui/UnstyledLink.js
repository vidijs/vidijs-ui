import React from 'react';
import { Link } from 'react-router-dom';

export default function UnstyledLink(props) {
  const style = {
    textDecoration: 'none',
    color: 'inherit',
  };
  return (
    <Link style={style} {...props} onClick={e => e.stopPropagation()} />
  );
}
