import React, { useMemo, useState, useEffect } from 'react';
import cn from 'classnames';
import s from './index.module.scss';

const HEADER_OFFSET_Y = 100;

export default function TableOfContents({ toc }) {
  const [currentHeaderUrl, setCurrentHeaderUrl] = useState(undefined);
  useEffect(() => {
    const handleScroll = () => {
      let aboveHeaderUrl;
      const currentOffsetY = window.pageYOffset;
      const headerElements = document.querySelectorAll('.anchor-header');
      for (const elem of headerElements) {
        const { top } = elem.getBoundingClientRect();
        const elemTop = top + currentOffsetY;
        const isLast = elem === headerElements[headerElements.length - 1];
        if (currentOffsetY < elemTop - HEADER_OFFSET_Y) {
          aboveHeaderUrl &&
            setCurrentHeaderUrl(aboveHeaderUrl.split(location.origin)[1]);
          !aboveHeaderUrl && setCurrentHeaderUrl(undefined);
          break;
        } else {
          isLast && setCurrentHeaderUrl(elem.href.split(location.origin)[1]);
          !isLast && (aboveHeaderUrl = elem.href);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const replaceItems = useMemo(() => {
    if (currentHeaderUrl) {
      return toc.replace(
        `"${currentHeaderUrl}"`,
        `"${currentHeaderUrl}" class="${s.isCurrent}"`
      );
    } else {
      return toc;
    }
  }, [currentHeaderUrl]);

  return toc ? (
    <div className={s.tocWrapper}>
      <nav className={cn('table-of-contents', s.innerContainer)}>
        <h3 className={s.title}>TABLE OF CONTENTS</h3>
        <div
          className={s.contents}
          dangerouslySetInnerHTML={{ __html: replaceItems }}
        />
      </nav>
    </div>
  ) : null;
}
