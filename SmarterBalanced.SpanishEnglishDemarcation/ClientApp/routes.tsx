import * as React from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { home } from "./components/Home";
import { FetchData } from "./components/FetchData";
import { Counter } from "./components/Counter";

export const routes = (
  <Layout>
    <Route exact path="/" component={home} />
    <Route path="/counter" component={Counter} />
    <Route path="/fetchdata" component={FetchData} />
  </Layout>
);
