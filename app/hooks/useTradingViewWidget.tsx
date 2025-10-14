'use client'
import { useEffect, useRef } from "react"


const useTradingViewWidget = (scriptUrl: string, config: Record<string, unknown>, height=600) => {
    const containerRef = useRef<HTMLDivElement>(null);
     useEffect(
        
  () => {
    const node = containerRef.current;
    if (!node) return;
    if (node.dataset.loaded) return;

    // create a widget placeholder
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'tradingview-widget-container__widget';
    widgetDiv.style.height = `${height}px`;
    widgetDiv.style.width = '100%';
    node.appendChild(widgetDiv);

    const script = document.createElement('script');
    // use the passed scriptUrl variable (was a string literal before)
    script.src = scriptUrl;
    script.type = 'text/javascript';
    script.async = true;
    // TradingView expects the config object as the script's text content
    script.text = JSON.stringify(config);

    node.appendChild(script);
    node.dataset.loaded = 'true';

    return () => {
      if (!node) return;
      if (node.contains(script)) {
        node.removeChild(script);
      }
      if (node.contains(widgetDiv)) {
        node.removeChild(widgetDiv);
      }
      node.dataset.loaded = '';
    };
  },
    [scriptUrl, config, height]
  );
  return (
    containerRef
  )
}

export default useTradingViewWidget