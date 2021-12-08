import _ from "lodash";

import AddHelloWorldButton from "./components/add-hello-button";
import Heading from "./components/heading";

const addHelloWorldButton = new AddHelloWorldButton();
addHelloWorldButton.render();

const heading = new Heading(_.upperFirst("Index Page"));
heading.render();
