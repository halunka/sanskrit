import test from 'ava'
import i18n from '../i18n'

test('i18n.add should add a new translation', t => {
  const res = i18n.add('asdf', { en: 'asdf-en', de: 'asdf-de' })
  t.is(res.asdf, 'asdf-en')
})

test('i18n.t should return the translation of the passed string', t => {
  t.is(i18n.t.asdf, 'asdf-en')
})

test('i18n.setLanguage should change all translations', t => {
  t.is(i18n.t.asdf, 'asdf-en')
  i18n.setLanguage('de')
  t.is(i18n.t.asdf, 'asdf-de')
})
