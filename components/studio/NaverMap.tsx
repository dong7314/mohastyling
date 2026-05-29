"use client";

import { useEffect, useRef, useState } from "react";
import { Home } from "lucide-react";

const LAT = 37.581814;
const LNG = 127.054501;
const NAVER_MAP_URL = `https://map.naver.com/p/search/%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EB%AA%A8%ED%95%98/place/1427251961?entry=bmp&from=map&placePath=/home?from=map&fromPanelNum=2&timestamp=202605091852&locale=ko&svcName=map_pcv5&searchText=%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4%20%EB%AA%A8%ED%95%98&c=16.02,0,0,0,dh`;

export function NaverMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<unknown>(null);
  const [mapReady, setMapReady] = useState(false);
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadConfig() {
      try {
        const response = await fetch("/api/public-config", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to load public config: ${response.status}`);
        }

        const data = (await response.json()) as {
          naverMapClientId?: string;
        };

        setClientId(data.naverMapClientId?.trim() || "");
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Failed to load Naver map config:", error);
          setClientId("");
        }
      }
    }

    loadConfig();

    return () => {
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!clientId || !mapRef.current) return;

    function initMap() {
      if (!mapRef.current || !window.naver) return;
      if (mapInstance.current) return;

      const position = new window.naver.maps.LatLng(LAT, LNG);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: position,
        zoom: 16,
      });

      mapInstance.current = map;
      setMapReady(true);

      const marker = new window.naver.maps.Marker({
        position: position,
        map: map,
      });

      const openNaverMap = () => {
        window.open(NAVER_MAP_URL, "_blank");
      };

      window.naver.maps.Event.addListener(map, "click", openNaverMap);
      window.naver.maps.Event.addListener(marker, "click", openNaverMap);
    }

    if (window.naver) {
      initMap();
      return;
    }

    const existing = Array.from(
      document.querySelectorAll<HTMLScriptElement>("script[data-naver-maps]")
    ).find((scriptElement) => scriptElement.dataset.clientId === clientId);
    if (existing) {
      existing.addEventListener("load", initMap);
      return () => {
        existing.removeEventListener("load", initMap);
      };
    }

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(clientId)}`;
    script.setAttribute("data-naver-maps", "true");
    script.setAttribute("data-client-id", clientId);
    script.onload = initMap;
    document.head.appendChild(script);
  }, [clientId]);

  const goHome = () => {
    const map = mapInstance.current as {
      setCenter: (pos: unknown) => void;
      setZoom: (zoom: number) => void;
    } | null;
    if (!map || !window.naver) return;
    map.setCenter(new window.naver.maps.LatLng(LAT, LNG));
    map.setZoom(16);
  };

  if (!clientId) return null;

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="relative w-[50%]">
        <div
          ref={mapRef}
          className="w-full h-[400px] rounded-lg border border-neutral-200 cursor-pointer"
        />
        {mapReady && (
          <button
            onClick={goHome}
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-lg bg-white shadow-md border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            aria-label="원래 위치로 이동"
          >
            <Home size={18} className="text-neutral-600" />
          </button>
        )}
      </div>
      <div className="w-[50%] min-w-[200px] mt-6">
        <p className="font-sans font-semibold text-lg text-center text-neutral-800 mb-1">
          오시는 길
        </p>
        <p className="font-sans text-neutral-500 text-center">
          서울 동대문구 전농동 141-97번지 2층
        </p>
      </div>
    </div>
  );
}
