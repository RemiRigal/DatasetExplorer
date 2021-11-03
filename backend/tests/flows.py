#!/usr/bin/env python
# coding: utf-8

import cv2
from dataset_explorer.flows.flow import Flow


if __name__ == "__main__":
    flow = Flow.fromFile("/home/remi/.DatasetExplorer/flows/tmpfg5vf3jp.ppln")

    print(f"Number of nodes: {len(flow.diagram.nodes)}")
    print(f"Input nodes: {flow.diagram.inputNodes}")
    print(f"Outputs nodes: {flow.diagram.outputNodes}")

    data = cv2.imread("/home/remi/Projects/DatasetExplorer/data/abdz_infrared_arashiyama_mockup_0.jpg")
    result = flow.diagram.apply(data)
    print(len(result))

    for index, image in enumerate(result):
        cv2.imshow(f"Image {index}", image)
    cv2.waitKey(0)
