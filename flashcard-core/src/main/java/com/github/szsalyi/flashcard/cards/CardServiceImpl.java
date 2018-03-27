package com.github.szsalyi.flashcard.cards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.convert.ConversionService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CardServiceImpl implements CardService{

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    @Qualifier("createConversionService")
    private ConversionService conversionService;

    @Override
    public CardVO save(CardVO cardVO) {
        CardEntity cardEntity = cardRepository.save(conversionService.convert(cardVO, CardEntity.class));
        return conversionService.convert(cardEntity, CardVO.class);
    }

    @Override
    public List<CardVO> getAllCards() {
        List<CardVO> cards = new ArrayList<>();
        for ( CardEntity cardEntity : cardRepository.findAll()) {
            cards.add(conversionService.convert(cardEntity, CardVO.class));
        }
        return cards;
    }

    @Override
    public List<CardVO> findCardsByCategoryIdAndUsername(Long categoryId, String username) {
        List<CardVO> cards = new ArrayList<>();
        for ( CardEntity cardEntity : cardRepository.findCardEntitiesByCategoriesAndUserUserName(categoryId, username)) {
            cards.add(conversionService.convert(cardEntity, CardVO.class));
        }
        return cards;
    }

    @Override
    public CardVO getCard(long id) {
        return conversionService.convert(cardRepository.findOne(id), CardVO.class);
    }

    @Override
    public void deleteCard(long id) {
        cardRepository.delete(id);
    }
}
