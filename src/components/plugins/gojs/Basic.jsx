import React, {Component} from 'react';
import go from "gojs";
import styles from "~/assets/css/plugins/go.module.css"

export default class Basic extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        let $ = go.GraphObject.make;  // for conciseness in defining templates
        let myDiagram = $(go.Diagram, this.basicRef,  // create a Diagram for the DIV HTML element
            {
                "undoManager.isEnabled": true  // enable undo & redo
            });
        // define a simple Node template
        myDiagram.nodeTemplate = $(
            go.Node,
            "Auto",  // the Shape will go around the TextBlock
            $(go.Shape, "RoundedRectangle", {strokeWidth: 0, fill: "white"},
                // Shape.fill is bound to Node.data.color
                new go.Binding("fill", "color")),
            $(go.TextBlock,
                {margin: 8, font: "bold 16px sans-serif", stroke: '#333'}, // Specify a margin to add some room around the text
                // TextBlock.text is bound to Node.data.key
                new go.Binding("text", "key"))
        );
        // but use the default Link template, by not setting Diagram.linkTemplate
        // create the model data that will be represented by Nodes and Links
        myDiagram.model = new go.GraphLinksModel(
            [
                {key: "Alpha", color: "lightblue"},
                {key: "Beta", color: "orange"},
                {key: "Gamma", color: "lightgreen"},
                {key: "Delta", color: "pink"}
            ],
            [
                {from: "Alpha", to: "Beta"},
                {from: "Alpha", to: "Gamma"},
                {from: "Beta", to: "Beta"},
                {from: "Gamma", to: "Delta"},
                {from: "Delta", to: "Alpha"}
            ]);
    }

    render() {
        return (
            <div ref={r => this.basicRef = r} className={styles.container}/>
        )
    }
}
