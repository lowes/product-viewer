/* @license
 * Copyright 2021 Lowe's Companies, Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

import typography from "../base/typography.module.scss";
import variables from "../abstracts/variables.module.scss";

const LabsTheme = createMuiTheme({
	//TYPOGRAPHY
	typography: {
		fontFamily: [
			"Inter",
			"-apple-system",
			"BlinkMacSystemFont",
			"Segoe UI",
			"Roboto",
			"Oxygen",
			"Ubuntu",
			"Cantarell",
			"Fira Sans",
			"Droid Sans",
			"Helvetica Neue",
			"sans-serif",
		].join(","),
		fontSize: 16,
		htmlFontSize: 16,
		h1: {
			lineHeight: typography.h1LineHeight,
			fontWeight: typography.h1FontWeight,
			fontSize: typography.h1FontSize,
			letterSpacing: typography.h1LetterSpacing,
		},
		h2: {
			lineHeight: typography.h2LineHeight,
			fontWeight: typography.h2FontWeight,
			fontSize: typography.h2FontSize,
			letterSpacing: typography.h2LetterSpacing,
		},
		h3: {
			lineHeight: typography.h3LineHeight,
			fontWeight: typography.h3FontWeight,
			fontSize: typography.h3FontSize,
			letterSpacing: typography.h3LetterSpacing,
		},
		h4: {
			lineHeight: typography.h4LineHeight,
			fontWeight: typography.h4FontWeight,
			fontSize: typography.h4FontSize,
			letterSpacing: typography.h4LetterSpacing,
		},
		h5: {
			lineHeight: typography.h5LineHeight,
			fontWeight: typography.h5FontWeight,
			fontSize: typography.h5FontSize,
			letterSpacing: typography.h5LetterSpacing,
		},
		h6: {
			lineHeight: typography.h6LineHeight,
			fontWeight: typography.h6FontWeight,
			fontSize: typography.h6FontSize,
		},
		subtitle1: {
			lineHeight: typography.sub1LineHeight,
			fontWeight: typography.sub1FontWeight,
			fontSize: typography.sub1FontSize,
		},
		subtitle2: {
			lineHeight: typography.sub2LineHeight,
			fontWeight: typography.sub2FontWeight,
			fontSize: typography.sub2FontSize,
			fontStyle: typography.sub2FontStyle,
			letterSpacing: typography.sub2LetterSpacing,
		},
		body1: {
			lineHeight: typography.body1LineHeight,
			fontWeight: typography.body1FontWeight,
			fontSize: typography.body1FontSize,
			letterSpacing: typography.body1LetterSpacing,
		},
		body2: {
			lineHeight: typography.body2LineHeight,
			fontWeight: typography.body2FontWeight,
			fontSize: typography.body2FontSize,
			letterSpacing: typography.body2LetterSpacing,
		},
		button: {
			lineHeight: typography.buttonLineHeight,
			fontWeight: typography.buttonFontWeight,
			fontSize: typography.buttonFontSize,
			letterSpacing: typography.buttonLetterSpacing,
		},
		caption: {
			lineHeight: typography.captionLineHeight,
			fontWeight: typography.captionFontWeight,
			fontSize: typography.captionFontSize,
			letterSpacing: typography.captionLetterSpacing,
		},
		overline: {
			lineHeight: typography.overlineLineHeight,
			fontWeight: typography.overlineFontWeight,
			fontSize: typography.overlineFontSize,
			letterSpacing: typography.overlineLetterSpacing,
		},
	},
	//COLORS
	palette: {
		primary: {
			// light: will be calculated from palette.primary.main,
			main: variables.p_base,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
			s900: variables.p_s900,
			s800: variables.p_s800,
			s700: variables.p_s700,
			s600: variables.p_s600,
			s500: variables.p_s500,
			s400: variables.p_s400,
			s300: variables.p_s300,
			s200: variables.p_s200,
			s100: variables.p_s100,
			base: variables.p_base,
			t100: variables.p_t100,
			t200: variables.p_t200,
			t300: variables.p_t300,
			t400: variables.p_t400,
			t500: variables.p_t500,
			t600: variables.p_t600,
			t700: variables.p_t700,
			t800: variables.p_t800,
			t900: variables.p_t900,
		},
		secondary: {
			// light: will be calculated from palette.secondary.main,
			main: variables.s_base,
			// dark: will be calculated from palette.secondary.main,
			s900: variables.s_s900,
			s800: variables.s_s800,
			s700: variables.s_s700,
			s600: variables.s_s600,
			s500: variables.s_s500,
			s400: variables.s_s400,
			s300: variables.s_s300,
			s200: variables.s_s200,
			s100: variables.s_s100,
			base: variables.s_base,
			t100: variables.s_t100,
			t200: variables.s_t200,
			t300: variables.s_t300,
			t400: variables.s_t400,
			t500: variables.s_t500,
			t600: variables.s_t600,
			t700: variables.s_t700,
			t800: variables.s_t800,
			t900: variables.s_t900,
		},
		tertiary: {
			s900: variables.t_s900,
			s800: variables.t_s800,
			s700: variables.t_s700,
			s600: variables.t_s600,
			s500: variables.t_s500,
			s400: variables.t_s400,
			s300: variables.t_s300,
			s200: variables.t_s200,
			s100: variables.t_s100,
			base: variables.t_base,
			t100: variables.t_t100,
			t200: variables.t_t200,
			t300: variables.t_t300,
			t400: variables.t_t400,
			t500: variables.t_t500,
			t600: variables.t_t600,
			t700: variables.t_t700,
			t800: variables.t_t800,
			t900: variables.t_t900,
		},
		neutral: {
			n900: variables.n_900,
			n800: variables.n_800,
			n700: variables.n_700,
			n600: variables.n_600,
			n500: variables.n_500,
			n450: variables.n_450,
			n400: variables.n_400,
			n350: variables.n_350,
			n300: variables.n_300,
			n250: variables.n_250,
			n200: variables.n_200,
			n150: variables.n_150,
			n100: variables.n_100,
			n50: variables.n_50,
		},
		alerts: {
			error: variables.a_error,
			warning: variables.a_warning,
			success: variables.a_success,
			info: variables.a_info,
		},
		ui: {
			border: variables.ui_border,
			link: variables.ui_link,
		},
	},
	spacing: (multiplier) => {
		return multiplier * 8;
	},
	overrides: {
		MuiInput: {
			root: {
				backgroundColor: "#FFFFFF",
				border: "1px solid",
				borderColor: variables.s_s600,
				borderRadius: "2px",
				paddingLeft: "8px",
				paddingRight: "8px",
			},
		},
	},
	props: {
		MuiInput: {
			disableUnderline: true,
		},
	},
});

export default LabsTheme;
