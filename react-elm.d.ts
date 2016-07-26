/// <reference path="../../react/react.d.ts"/>

declare module "redux-elm" {

	import ReactElement = __React.ReactElement;

	export type Action = Object;
	export type StatelessReactComponent = (props :Object) => ReactElement;
	export type Component = ReactElement | StatelessReactComponent;
	export type Dispatch = (action :Action) => void;
	export type MatcherResult = {
		wrap :string;
		unwrap :string;
		args :Object;
	};
	export type Matcher = (pattern :string) => ((action :Action) => MatcherResult | boolean);

	export type wrappedDispatch = (...args)=> ()=>Dispatch;
	/* @todo */ export type Reducer  = any;

	export interface createStore {
		[key :string] :any; //...store,
		dispatch :wrappedDispatch;
		replaceReducer :(nextReducer :Reducer)=>  // reducer
			(appState, action)=>Reducer;
	}

	export interface Matchers {
		matcher :Matcher;
		parameterizedMatcher :Matcher;
	}

	export class Updater<M> {
		constructor(initialModel :M, saga? :() => GeneratorFunction, matcher? :Matcher);

		case(pattern :string, handler :(model :M, action :Action) => M, matcher? :Matcher) :Updater<M>;

		toReducer() :(model :M, action :Action) => M
	}

	export function forwardTo(dispatch :Function, ...rest :Array<any>) :Function;

	export function wrapAction(action :Object, ...rest :Array<any>) :Object;

	export function view(component :Component) :Component;

	export default function (reducer, initialAppState) :createStore;
}

