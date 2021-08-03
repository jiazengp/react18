import React, { Component } from "react";

interface SuspenseProps {
  fallback: React.ReactNode;
}

interface SuspenseState {
  loading: boolean;
}

export default class Suspense extends React.Component<
  SuspenseProps,
  SuspenseState
> {
  mounted: any = null;
  state = { loading: false };
  componentDidCatch(error: any) {
    if (typeof error.then === "function") {
      this.setState({ loading: true });
      error.then(() => {
        this.setState({ loading: false });
      });
    }
  }
  render() {
    const { fallback, children } = this.props;
    const { loading } = this.state;
    return loading ? fallback : children;
  }
}
