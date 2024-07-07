"use client";

import { useLayoutEffect } from "react";

import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

import { stopWords } from "@/config/words";
import { Provider, useAtomValue } from "jotai";
import { wordCloudAtom, wordCloudStore } from "@/store";

export default function WordCloud() {
  const wordCloud = useAtomValue(wordCloudAtom).toLowerCase();

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let zoomableContainer = root.container.children.push(
      am5.ZoomableContainer.new(root, {
        width: am5.p100,
        height: am5.p100,
        wheelable: true,
        pinchZoom: true,
      })
    );

    let zoomTools = zoomableContainer.children.push(
      am5.ZoomTools.new(root, {
        target: zoomableContainer,
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/word-cloud/
    let series = zoomableContainer.contents.children.push(
      am5wc.WordCloud.new(root, {
        excludeWords: stopWords,
        maxFontSize: am5.percent(25),
        text: wordCloud,
      })
    );

    // Configure labels
    series.labels.template.setAll({
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      fontFamily: "Courier New",
    });

    return () => {
      root.dispose();
    };
  }, [wordCloud]);

  return (
    <Provider store={wordCloudStore}>
      <fieldset className="grid gap-1 rounded-lg border p-4 min-h-[100px]">
        <small>*Most used words in user&apos;s prompt from all chats</small>
        <legend className="-ml-1 px-3 text-xl font-bold">Word Cloud</legend>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }} />
      </fieldset>
    </Provider>
  );
}
