declare module 'tailbreak' {
	interface TailbreakBreakpoints {
		sm: boolean;
		md: boolean;
		lg: boolean;
		xl: boolean;
		'2xl': boolean;
	}

	function TailbreakFactory(): TailbreakBreakpoints;

	export = TailbreakFactory;
}
