/**
 * Created by ljunb on 2016/11/19.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native'

import {ScrollableTabBar} from "react-native-scrollable-tab-view";

const DEFAULT_SCALE = 1
const SELECT_SCALE = 1.2
const DEFAULT_COLOR = 'black'
const SELECT_COLOR = 'red'
const length = 0
export default class FeedsCategoryBar extends Component {
    static propType = {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        tabNames: React.PropTypes.array,
    }

    state = {
        minWidth: gScreen.width / 4
    }

    offsetX = new Animated.Value(0)

    componentDidMount() {
        this.props.scrollValue.addListener(this.setAnimationValue)
    }

    setAnimationValue = ({value}) => {
        let pageX = this.state.minWidth * value
        this.refs.scrollView.scrollTo({x: pageX,animated: true});
        this.offsetX.setValue(value)
    }

    render() {
        const {tabs} = this.props
        const indicatorX = this.offsetX.interpolate({
            inputRange: [0, tabs.length - 1],
            outputRange: [0, gScreen.width * (tabs.length - 1) / tabs.length]
        })
        let len = this.props.tabs.length;
        let width = gScreen.width / 4
        if(len < 4){
            width = gScreen.width / len
        }
        return (
            <ScrollView
                ref="scrollView"
                automaticallyAdjustContentInsets={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={styles.tabs}
            >
                {tabs.map((tab, i) => {
                    const scale = this.offsetX.interpolate({
                        inputRange: [i - 2, i - 1, i, i + 1, i + 2],
                        outputRange: [DEFAULT_SCALE, DEFAULT_SCALE, SELECT_SCALE, DEFAULT_SCALE, DEFAULT_SCALE]
                    })
                    const color = this.offsetX.interpolate({
                        inputRange: [i - 2, i - 1, i, i + 1, i + 2],
                        outputRange: [DEFAULT_COLOR, DEFAULT_COLOR, SELECT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR]
                    })

                    return (
                            <Animated.View key={`Tab_${i}`} style={[styles.tab, {width: width,transform: [{scale}]}]}>
                                <TouchableOpacity
                                    key={`Tab_${i+100}`}
                                    activeOpacity={0.8}
                                    style={styles.tab}
                                    onPress={() => this.props.goToPage(i)}
                                >
                                    <Animated.Text style={{color: color, fontSize: 14}}>
                                        {this.props.tabNames[i]}
                                    </Animated.Text>
                                </TouchableOpacity>
                            </Animated.View>
                    )
                })}
                {/*<Animated.View style={[styles.indicatorContainer, {left: indicatorX}]}>
                    <View style={styles.indicator}/>
                </Animated.View> */}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexGrow: 0,
        flexDirection: 'row',
        height: 44,
        borderBottomColor: 'rgb(242, 242, 242)',
        borderBottomWidth: 1,
    },
    tab: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 7,
        height: 3,
        minWidth: gScreen.width / 4,
        alignItems: 'center'
    },
    indicator: {
        backgroundColor: 'red',
        height: 3,
        width: 3,
        borderRadius: 1.5,
    }
});