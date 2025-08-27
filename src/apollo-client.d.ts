/* eslint-disable */

import "@apollo/client";
import { HttpLink } from "@apollo/client";
import { Defer20220824Handler } from "@apollo/client/incremental";

declare module "@apollo/client" {
  export interface TypeOverrides extends Defer20220824Handler.TypeOverrides {}
  export interface DefaultContext extends HttpLink.ContextOptions {}
}
