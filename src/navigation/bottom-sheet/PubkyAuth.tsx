import React, { memo, ReactElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { BodyM, CaptionB, Text13UP, Title } from '../../styles/text';
import BottomSheetWrapper from '../../components/BottomSheetWrapper';
import SafeAreaInset from '../../components/SafeAreaInset';
import Button from '../../components/buttons/Button';
import BottomSheetNavigationHeader from '../../components/BottomSheetNavigationHeader';
import { useAppSelector } from '../../hooks/redux';
import {
	useSnapPoints,
} from '../../hooks/bottomSheet';
import { viewControllerSelector } from '../../store/reselect/ui.ts';
import { auth, parseAuthUrl } from '@synonymdev/react-native-pubky';
import { getPubkySecretKey } from '../../utils/pubky';
import { showToast } from '../../utils/notifications.ts';
import { dispatch } from '../../store/helpers.ts';
import { closeSheet } from '../../store/slices/ui.ts';

const defaultParsedUrl: PubkyAuthDetails = {
	relay: '',
	capabilities: [{
		path: '',
		permission: '',
	}],
	secret: '',
};

type Capability = {
	path: string;
	permission: string;
};

type PubkyAuthDetails = {
	relay: string;
	capabilities: Capability[];
	secret: string;
};

const PubkyAuth = (): ReactElement => {
	const { t } = useTranslation('security');
	const snapPoints = useSnapPoints('medium');
	const { url = '' } = useAppSelector((state) => {
		return viewControllerSelector(state, 'pubkyAuth');
	});
	const [parsed, setParsed] = React.useState<PubkyAuthDetails>(defaultParsedUrl);
	const [authorizing, setAuthorizing] = React.useState(false);
	const [authSuccess, setAuthSuccess] = React.useState(false);

	useEffect(() => {
		const fetchParsed = async (): Promise<void> => {
			const res = await parseAuthUrl(url);
			if (res.isErr()) {
				console.log(res.error.message);
				return;
			}
			setParsed(res.value);
		};
		fetchParsed().then();

		return (): void => {
			setParsed(defaultParsedUrl);
			setAuthorizing(false);
			setAuthSuccess(false);
		};
	}, [url]);

	const onDeny = (): void => {
		dispatch(closeSheet('pubkyAuth'));
	};

	const onAuthorize = async (): Promise<void> => {
		try {
			setAuthorizing(true);
			const secretKey = await getPubkySecretKey();
			if (secretKey.isErr()) {
				showToast({
					type: 'error',
					title: t('pubky_secret_error_title'),
					description: t('pubky_secret_error_description'),
				});
				setAuthorizing(false);
				return;
			}
			const authRes = await auth(url, secretKey.value);
			if (authRes.isErr()) {
				showToast({
					type: 'error',
					title: t('pubky_auth_error_title'),
					description: t('pubky_auth_error_description'),
				});
				setAuthorizing(false);
				return;
			}
			setAuthSuccess(true);
			setAuthorizing(false);
		} catch (e) {
			showToast({
				type: 'error',
				title: t('pubky_auth_error_title'),
				description: JSON.stringify(e),
			});
			setAuthorizing(false);
		}
	};

	return (
		<BottomSheetWrapper view="pubkyAuth" snapPoints={snapPoints}>
			<View style={styles.container}>
				<BottomSheetNavigationHeader
					title={t('authorization.title')}
					displayBackButton={false}
				/>
				<Text13UP color="secondary">{t('authorization.claims')}</Text13UP>
				<Title color="white">{parsed.relay}</Title>

				<View style={styles.buffer} />

				<BodyM color="secondary">{t('authorization.description')}</BodyM>

				<View style={styles.buffer} />

				<Text13UP color="secondary">{t('requested_permissions')}</Text13UP>
				{parsed.capabilities.map((capability) => {
					return (
						<View style={styles.row}>
							<CaptionB color={authSuccess ? 'green' : 'red'}>{capability.path}</CaptionB>
							<CaptionB color={authSuccess ? 'green' : 'red'}>{capability.permission}</CaptionB>
						</View>
					);
				})}

				<View style={styles.buffer} />

				<View style={styles.buttonContainer}>
					<Button
						style={styles.denyButton}
						text={t('authorization.deny')}
						size="large"
						onPress={onDeny}
					/>
					<Button
						loading={authorizing}
						style={styles.authorizeButton}
						text={authorizing ? t('authorization.authorizing') : t('authorization.authorize')}
						size="large"
						onPress={onAuthorize}
					/>
				</View>
				<SafeAreaInset type="bottom" minPadding={16} />
			</View>
		</BottomSheetWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 32,
	},
	buttonContainer: {
		marginTop: 'auto',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	authorizeButton: {
		flex: 1,
		margin: 5,
	},
	denyButton: {
		flex: 1,
		margin: 5,
		backgroundColor: 'black',
		borderWidth: 1,
	},
	buffer: {
		height: 16,
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});

export default memo(PubkyAuth);
