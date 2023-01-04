import React, { memo, ReactElement, useMemo } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
	GestureResponderEvent,
} from 'react-native';

import { Text01M, Text02M } from '../../../styles/text';
import {
	LightningIcon,
	SettingsIcon,
	SpeedFastIcon,
	SpeedNormalIcon,
	SpeedSlowIcon,
} from '../../../styles/icons';
import { EFeeIds } from '../../../store/types/fees';
import useColors from '../../../hooks/colors';
import useDisplayValues from '../../../hooks/displayValues';
import { FeeText } from '../../../store/shapes/fees';

const FeeItem = ({
	id,
	isSelected,
	sats,
	onPress,
}: {
	id: EFeeIds;
	sats: number;
	isSelected: boolean;
	onPress: (event: GestureResponderEvent) => void;
}): ReactElement => {
	const colors = useColors();
	const { title, description } = FeeText[id];
	const totalFeeDisplay = useDisplayValues(sats);

	const icon = useMemo(() => {
		switch (id) {
			case EFeeIds.instant:
				return <SpeedFastIcon color="brand" />;
			case EFeeIds.fast:
				return <SpeedFastIcon color="brand" />;
			case EFeeIds.normal:
				return <SpeedNormalIcon color="brand" />;
			case EFeeIds.slow:
				return <SpeedSlowIcon color="brand" />;
			case EFeeIds.custom:
				return <SettingsIcon color="gray1" width={32} height={32} />;
		}
	}, [id]);

	return (
		<>
			<TouchableOpacity
				onPress={onPress}
				style={[
					styles.root,
					isSelected ? { backgroundColor: colors.white08 } : null,
				]}>
				<View style={styles.imageContainer}>{icon}</View>

				<View style={styles.row}>
					<View style={styles.cell}>
						<Text01M>{title}</Text01M>
						<Text01M>
							<LightningIcon height={17} color="gray1" />
							{sats}
						</Text01M>
					</View>
					<View style={styles.cell}>
						<Text02M color="gray1">{description}</Text02M>
						<Text02M color="gray1">
							{totalFeeDisplay.fiatSymbol} {totalFeeDisplay.fiatFormatted}
						</Text02M>
					</View>
				</View>
			</TouchableOpacity>
			{id !== EFeeIds.custom && <View style={styles.divider} />}
		</>
	);
};

const styles = StyleSheet.create({
	root: {
		flexDirection: 'row',
		paddingRight: 16,
		alignContent: 'center',
		justifyContent: 'center',
		height: 80,
	},
	imageContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		width: 64,
	},
	row: {
		flex: 1,
		justifyContent: 'center',
		alignContent: 'center',
	},
	cell: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
	},
	divider: {
		marginHorizontal: 16,
		height: 1,
		borderBottomWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
});

export default memo(FeeItem);
