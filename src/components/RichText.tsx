import React from 'react';

// Lexical node formats
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;
const IS_SUBSCRIPT = 32;
const IS_SUPERSCRIPT = 64;

interface LexicalTextNode {
  type: 'text';
  text: string;
  format?: number;
  mode?: string;
  style?: string;
  detail?: number;
}

interface LexicalElementNode {
  type: string;
  tag?: string;
  children?: LexicalNode[];
  direction?: 'ltr' | 'rtl' | null;
  indent?: number;
  format?: string | number;
  url?: string;
  newTab?: boolean;
}

type LexicalNode = LexicalTextNode | LexicalElementNode;

interface RichTextProps {
  content?: {
    root?: {
      children?: LexicalNode[];
    };
  } | any;
  className?: string;
}

export default function RichText({ content, className = '' }: RichTextProps) {
  if (!content || !content.root || !content.root.children) {
    return null;
  }

  const renderTextNode = (node: LexicalTextNode, index: number) => {
    let textElement: React.ReactNode = node.text;

    if (!textElement) return null;

    const format = node.format || 0;

    if (format & IS_BOLD) {
      textElement = <strong key={index}>{textElement}</strong>;
    }
    if (format & IS_ITALIC) {
      textElement = <em key={index}>{textElement}</em>;
    }
    if (format & IS_UNDERLINE) {
      textElement = <u key={index}>{textElement}</u>;
    }
    if (format & IS_STRIKETHROUGH) {
      textElement = <span key={index} style={{ textDecoration: 'line-through' }}>{textElement}</span>;
    }
    if (format & IS_CODE) {
      textElement = <code key={index}>{textElement}</code>;
    }
    if (format & IS_SUBSCRIPT) {
      textElement = <sub key={index}>{textElement}</sub>;
    }
    if (format & IS_SUPERSCRIPT) {
      textElement = <sup key={index}>{textElement}</sup>;
    }

    return <React.Fragment key={index}>{textElement}</React.Fragment>;
  };

  const renderElementNode = (node: LexicalElementNode, index: number): React.ReactNode => {
    const children = node.children ? node.children.map((child, i) => renderNode(child, i)) : null;

    switch (node.type) {
      case 'paragraph':
        return <p key={index} style={{ marginBottom: '1.25rem' }}>{children}</p>;
      case 'heading': {
        const Tag = (node.tag || 'h2') as any;
        const style: React.CSSProperties = {
          marginTop: '2rem',
          marginBottom: '1rem',
          color: 'var(--ink)'
        };
        return <Tag key={index} style={style}>{children}</Tag>;
      }
      case 'list': {
        const Tag = (node.tag === 'ol' ? 'ol' : 'ul') as any;
        const style: React.CSSProperties = {
          marginLeft: '2rem',
          marginBottom: '1.5rem',
          listStyleType: node.tag === 'ol' ? 'decimal' : 'disc'
        };
        return <Tag key={index} style={style}>{children}</Tag>;
      }
      case 'listitem':
        return <li key={index} style={{ marginBottom: '0.5rem' }}>{children}</li>;
      case 'link': {
        const target = node.newTab ? '_blank' : undefined;
        const rel = node.newTab ? 'noopener noreferrer' : undefined;
        return (
          <a 
            key={index} 
            href={node.url} 
            target={target} 
            rel={rel} 
            style={{ color: 'var(--blue)', textDecoration: 'underline' }}
          >
            {children}
          </a>
        );
      }
      case 'quote':
        return (
          <blockquote 
            key={index} 
            style={{ 
              borderLeft: '4px solid var(--orange)', 
              paddingLeft: '1rem', 
              color: 'var(--muted)', 
              fontStyle: 'italic',
              margin: '1.5rem 0'
            }}
          >
            {children}
          </blockquote>
        );
      case 'horizontalrule':
        return <hr key={index} style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid var(--line)' }} />;
      default:
        // Fallback for custom blocks or unhandled node types
        return <div key={index}>{children}</div>;
    }
  };

  const renderNode = (node: LexicalNode, index: number): React.ReactNode => {
    if (node.type === 'text') {
      return renderTextNode(node as LexicalTextNode, index);
    }
    return renderElementNode(node as LexicalElementNode, index);
  };

  return (
    <div className={`rich-text-content ${className}`} style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--body)' }}>
      {content.root.children.map((node: LexicalNode, index: number) => renderNode(node, index))}
    </div>
  );
}
