import React from 'react';
import {withTranslation} from 'react-i18next';
import {Header, ListItem, ThemedView} from 'src/components';
import Rate from 'react-native-rate';
import options from 'src/config/config-rate';
import Container from 'src/containers/Container';
import {IconHeader, TextHeader, CartIcon} from 'src/containers/HeaderComponent';

import {mainStack} from 'src/config/navigator';
import {configsSelector, languageSelector} from 'src/modules/common/selectors';
import {connect} from 'react-redux';

class HelpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rated: false,
    };
  }

  render() {
    const {t, navigation, configs, language} = this.props;
    const titleProps = {
      medium: true,
    };

    return (
      <ThemedView isFullView>
        <Header
          leftComponent={<IconHeader />}
          centerComponent={<TextHeader title={t('common:text_help_info')} />}
          rightComponent={<CartIcon />}
        />
        <Container>
          <ListItem
            title={t('profile:text_contact')}
            titleProps={titleProps}
            chevron
            type="underline"
            onPress={() => navigation.navigate(mainStack.contact)}
          />
          <ListItem
            title={t('profile:text_privacy')}
            titleProps={titleProps}
            chevron
            type="underline"
            // onPress={() => navigation.navigate(profileStack.privacy)}
            onPress={() =>
              navigation.navigate(mainStack.page, {
                id: configs.getIn(['policy', language]),
                type: 'page',
              })
            }
          />
          <ListItem
            title={t('profile:text_about')}
            titleProps={titleProps}
            chevron
            type="underline"
            // onPress={() => navigation.navigate(profileStack.about)}
            onPress={() =>
              navigation.navigate(mainStack.page, {
                id: configs.getIn(['about', language]),
                type: 'page',
              })
            }
          />
          <ListItem
            title={t('profile:text_rate_app')}
            titleProps={titleProps}
            chevron
            type="underline"
            onPress={() => {
              Rate.rate(options, (success, errorMessage) => {
                if (success) {
                  // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                  this.setState({rated: true});
                }
              });
            }}
          />
        </Container>
      </ThemedView>
    );
  }
}

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(HelpScreen));
